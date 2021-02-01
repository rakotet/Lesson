<?php

require_once './Workerman/Autoloader.php';

use Workerman\Lib\Timer;
use Workerman\Worker;

$connections = [];

$worker = new Worker("websocket://0.0.0.0:8001");

$worker->onConnect = function($connection) use (&$connections) {
    
    $connection->onWebSocketConnect = function($connection) use (&$connections) {
        echo "Hello World!\n";
        echo $connection->id."\n";
        $userId = $connection->id;
        $connection->useId = $userId;
        $connections[$connection->id] = $connection;
        
        foreach ($connections as $c) {
            $c->send($c->id);
        }
    };
};


Worker::runAll();