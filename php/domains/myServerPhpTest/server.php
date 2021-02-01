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
        //print_r($_GET);
        $userName = $_GET['str'];
        $userId = $connection->id;
        $connection->useName = $userName;
        $connection->useId = $userId;
        $connections[$connection->id] = $connection;
        $connection->send(json_encode($connections));
    };
};


Worker::runAll();