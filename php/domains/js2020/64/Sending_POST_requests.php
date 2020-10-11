<?php
    $data = file_get_contents('php://input'); // принимаем запрос
    $data = json_decode($data); // раздодируем json
    echo $data->x ** 2; // возводим в квадрат свойство объекта