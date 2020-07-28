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
    $result = $pdo->exec($query); // возвращает количество затронутых строк
    $last_id = $pdo->lastInsertId(); // возвращает id последней вставленной записи
    echo $result.' - '.$last_id;
}catch (PDOException $e) {
    echo 'Ошибка записи в таблицу: '.$e->getMessage();
}

echo '<br/>';

$query = 'UPDATE `secret_articles` SET `date` = `date` + 1'; // обновляем значение в колонке таблицы
$result = $pdo->exec($query);
echo $result.'<br/>';

$query = "DELETE FROM `secret_articles` WHERE `id`= '$last_id'"; // удаляем последнию запись по id из таблицы (но есть проблема автоинкремента!!! помпить об этом)
$result = $pdo->exec($query);
echo $result.'<br/><br/>';

// выводим всю таблицу в виде массива, но используем встроенные методы PDO а не цикл

$query = 'SELECT * FROM `secret_user`'; // sql запрос
$result = $pdo->query($query); // выполняем sql запрос
$table = $result->fetchAll(PDO::FETCH_ASSOC); // записываем таблицу в виде массива в переменную (можно в параметре писать PDO::FETCH_ASSOC что бы не было лишних индексов)
print_r($table);
echo '<br/><br/>';

// Параметризация sql запросов (обезопасивание sql запросов от взлома базы)
$email = 'vasya@mail.ru'; // Допустим, пришла из формы
$query= 'SELECT * FROM `secret_user` WHERE `email` = ?'; // в ? потом подставим переменную (можно указывать несколько ?)
$query = $pdo->prepare($query); // обезапасивает запрос и возвращает обезапасенный запрос
$query->execute([$email]); // добавляет в запросс параметры вместо ? и обезопасивает их и выполняет запросс (можно передавать несколько параметров)
$row = $query->fetch(); // записываем строку таблицы в переменную
print_r($row);
