<?php

require_once './Workerman/Autoloader.php';
require_once 'database_class.php';

use Workerman\Lib\Timer;
use Workerman\Worker;


$worker = new Worker("websocket://192.168.0.12:8001");

// Создаем объект для работы с базой данных
$pdo = new DataBase();
$pdo->connect();

$worker->onConnect = function($connection) use ($worker) {
    echo "Hello World!\n";
    echo $connection->id."\n";
    
};

$worker->onMessage = function($connection, $data) use ($worker) {
    //Декодируем сообщение приходящее с клиента
    $messageData = json_decode($data, true);
    print_r($messageData);

    //Сообщение с клиента в чат 
    if ($messageData['action'] == 'massageChatClient') {

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
        if($messageData['password'] == 123) {
            $connection->userName = $messageData['login'];
            echo $connection->userName.' -> '.$connection->id.': '.'Авторизация успешна'."\n";

            $messageData = [
                'action' => 'authorized',
                'logon' => true,
                'userId' => $connection->id,
                'userName' => $connection->userName
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
    }
    
};

$worker->onClose = function($connection) {
    if(empty($connection->userName)) $connection->userName = 'anonim';
    echo $connection->userName.' -> '.$connection->id.': '.'соединение закрыто'."\n";
};


Worker::runAll();