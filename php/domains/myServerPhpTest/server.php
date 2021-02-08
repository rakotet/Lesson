<?php

require_once './Workerman/Autoloader.php';

use Workerman\Lib\Timer;
use Workerman\Worker;


$worker = new Worker("websocket://localhost:8001");

$worker->onConnect = function($connection) use ($worker) {
    echo "Hello World!\n";
    echo $connection->id."\n";
    $connection->userName = 'anonim';
    
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