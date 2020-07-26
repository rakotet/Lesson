<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'mysite');

$mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_errno) exit('Ошибка соединения с БД');
$mysqli->set_charset('utf8');

for ($i = 0; $i < 5; $i++) { // создаем пять одинаковых таблиц с разными именами
    $query = 'CREATE TABLE `test_' . $i . '`
    ( `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT , 
    `login` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
    `date` INT(10) UNSIGNED NULL DEFAULT NULL ,
    PRIMARY KEY (`id`), UNIQUE (`login`))
    ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci;'; // sql запрос

    echo $mysqli->query($query).'<br/>'; // выполняем запрос к БД
}

for ($i = 0; $i < 5; $i++) { // удаляем созданные 5 таблиц
    $query = "DROP TABLE `test_$i`";
    echo $mysqli->query($query).'<br/>';
}

$mysqli->close();