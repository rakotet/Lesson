<?php

require_once './Workerman/Autoloader.php';
require_once 'database_class.php';

use Workerman\Lib\Timer;
use Workerman\Worker;


$worker = new Worker("websocket://127.0.0.1:8001");

// Создаем объект для работы с базой данных
$pdo = new DataBase();

$worker->onConnect = function($connection) use ($worker) {
    echo "Hello World!\n";
    echo $connection->id."\n";

    $connection->userName = 'anonim';
};

$worker->onMessage = function($connection, $data) use ($worker, $pdo) {
    //Декодируем сообщение приходящее с клиента
    $messageData = json_decode($data, true);

    print_r($messageData);

    //Сообщение с клиента в чат 
    if ($messageData['action'] == 'massageChatClient') {

        $pdo->connect();
        $pdo->chatMessageCreate($connection->userName, $messageData['text']); // сохраняем сообщение в БД

        $messageData = [
            'action' => 'massageChatServer',
            'userName' => $connection->userName,
            'text' => $messageData['text']
        ];
        $message = json_encode($messageData);

        foreach($worker->connections as $c) {
            $c->send($message);
        }

        // Сообщение с клиента при авторизации пользователя
    } elseif($messageData['action'] == 'authorized') {

        $pdo->connect();
        $login = $pdo->searchLogin($messageData['login']);
        $password = $pdo->searchPassword(md5($messageData['password']));
        $userList = $pdo->usersList();

        if($messageData['login'] == $login['login'] && md5($messageData['password']) == $password['password']) {
            $connection->userName = $messageData['login'];
            echo $connection->userName.' -> '.$connection->id.': '.'Авторизация успешна'."\n";

            $messageData = [
                'action' => 'authorized',
                'logon' => true,
                'userId' => $connection->id,
                'userName' => $connection->userName,
                'userList' => $userList
            ];
            $message = json_encode($messageData);

            $connection->send($message);
            
            // Ошибка при авторизации
        } else {
            $connection->userName = $messageData['login'];
            echo $messageData['login'].' -> '.$connection->id.': '.'Не верный пароль'."\n";

            $messageData = [
                'action' => 'authorized',
                'logon' => false
            ];
            $message = json_encode($messageData);

            $connection->send($message);
        }
    } elseif($messageData['action'] == 'privateMessageLoadingClient') {
        $pdo->connect();
        $privateMessageData = $pdo->loadingPrivateMessages($connection->userName);
        
        $messageData = [
            'action' => 'privateMessageLoadingServer',
            'listPrivateMessage' => $privateMessageData
        ];
        $message = json_encode($messageData);

        $connection->send($message);

    } elseif($messageData['action'] == 'massagePrivateClient') {
        $pdo->connect();
        $pdo->privateMessage($connection->userName, $messageData['select'], $messageData['text'], $messageData['date']);

        $privateMessageData = $pdo->loadingPrivateMessages($connection->userName);
        $privateMessageDataSelect = $pdo->loadingPrivateMessages($messageData['select']);
        
        $messageDataServer = [
            'action' => 'privateMessageLoadingServer',
            'listPrivateMessage' => $privateMessageData
        ];
        $message = json_encode($messageDataServer);

        $messageDataSelect = [
            'action' => 'privateMessageLoadingServer',
            'listPrivateMessage' => $privateMessageDataSelect
        ];
        $messageSelect = json_encode($messageDataSelect);

        foreach($worker->connections as $c) {
            if($c->userName == $messageData['select']) {
                $c->send($messageSelect);
                if($pdo->correspondsWithMe($connection->userName, $messageData['select'])) {
                    $c->send(json_encode(['action' => 'privateMessageUserServer', 'privateMessage' => '<p>'.$connection->userName.' '.$messageData['date'].'</p>'.'<p>'.$messageData['text'].'</p>'.'</br>']));
                }
            }
        }

        $connection->send($message);
        $connection->send(json_encode(['action' => 'privateMessageUserServer', 'privateMessage' => '<p>'.$connection->userName.' '.$messageData['date'].'</p>'.'<p>'.$messageData['text'].'</p>'.'</br>']));

    } elseif($messageData['action'] == 'userPrivateMessageLoadingClient') {
        $pdo->connect();
        $userPrivateMessageLoadingServer = $pdo->userPrivateMessageLoadingClient($messageData['id'], $messageData['user'], $messageData['userTo']);

        $messageData = [
            'action' => 'userPrivateMessageLoadingServer',
            'data' => $userPrivateMessageLoadingServer
        ];
        $message = json_encode($messageData);

        $connection->send($message);

    } elseif($messageData['action'] == 'backPrivateMessageLoadingClient') {
        $pdo->connect();
        $pdo->updataUserTo($messageData['id'], $messageData['user']);
    }
};

$worker->onClose = function($connection) use ($pdo) {
    echo $connection->userName.' -> '.$connection->id.': '.'соединение закрыто'."\n";
    
    $pdo->connect();
    $pdo->closePrivateMessage($connection->userName);
};


Worker::runAll();