<?php
// Расширение и класс PDO создан для работы с различными базами данных (не только MySQL)

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'mysite');

try { // создаем объект подключения к базе
    $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]); // 1 передаем драйвер базы с именем сервера, 2 название базы данных, 3 пользователь, 4 пароль, 5 включение отображение ошибок
} catch (PDOException $e) {
    echo 'Ошибка при подключении к базе данных!';
}

$query = 'SELECT * FROM `secret_user`'; // sql запрос
$result = $pdo->query($query); // выполняем sql запрос
$row = $result->fetch(); // записываем первую строку из таблицы в переменную в виде массива
print_r($row);
echo '<br/>';

try {
    $query = "INSERT INTO `secret_articles` (`user_id`, `title`, `text`, `date`)
    VALUES ('1', 'новая статья', 'Текст этой новой статьи....', UNIX_TIMESTAMP())";
    $result = $pdo->exec($query);
    echo $result;
}catch (PDOException $e) {
    echo 'Ошибка записи в таблицу: '.$e->getMessage();
}

echo '<br/>';

$query = 'UPDATE `secret_articles` SET `date` = `date` + 1'; // обновляем значение в колонке таблицы
$result = $pdo->exec($query);
echo $result.'<br/>';