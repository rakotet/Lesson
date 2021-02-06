<?php

require_once './Workerman/Autoloader.php';

use Workerman\Lib\Timer;
use Workerman\Worker;


$worker = new Worker("websocket://localhost:8001");

$worker->onConnect = function($connection) use ($worker) {
    echo "Hello World!\n";
    echo $connection->id."\n";
    $connection->userName = 'anonim';

    $user1 = file('1user.txt');
    $num1 = file('1num.txt');
    $result1 = [];
    $user2 = file('2user.txt');
    $num2 = file('2num.txt');
    $result2 = [];
    $result3 = [];

    for ($i = 0; $i < count($user1); $i++) {
        $result1[$i] = [$user1[$i], $num1[$i]] ;
    }

    for ($i = 0; $i < count($user2); $i++) {
        $result2[$i] = [$user2[$i], $num2[$i]];
    }
    
    $result3[0] = $result1;
    $result3[1] = $result2;

    $connection->send(json_encode($result3));
    // foreach ($worker->connections as $c) {
    //     $c->send($c->id);
    // }
    
};

$worker->onMessage = function($connection, $data) use ($worker) {
    $messageData = json_decode($data, true);
    print_r($messageData);

    if($messageData['action'] == 'authorized') {
        $connection->userName = $messageData['name'];
        foreach($worker->connections as $c) {
            $c->send($c->userName.': '.$messageData['text']);
        }
    } elseif ($messageData['action'] == 'massage') {
        foreach($worker->connections as $c) {
            $c->send($c->userName.': '.$messageData['text']);
        }
        if ($messageData['text'] == 'as') {
            $connection->destroy();
        }
    } 
    
};

$worker->onClose = function($connection) {
    echo $connection->userName.' -> '.$connection->id.': '.'соединение закрыто'."\n";
};


Worker::runAll();