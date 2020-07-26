<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'mysite');

$mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_errno) exit('Ошибка соединения с БД');
$mysqli->set_charset('utf8');

$result_set = $mysqli->query('SELECT * FROM `secret_user`'); //sql запрос с выводом всей таблицы записываем в переменную, по сути записываем двумерный массив
$table = [];
while (($row = $result_set->fetch_assoc()) != false) // возвращает строку таблицы и переходит к следущей (сдвигая внутренний указатель объекта) пока не дойдет до конца таблицы
{
    $table[] = $row;
}

print_r($table); // печатает нашу sql таблицу в виде двумерного массива с которым уже можно работать и доставать данные

echo '<br/>---------------------------------------------------------<br/>>';

$result_set = $mysqli->query('SELECT `email`, `balance` FROM `secret_user`'); // sql запрос на выборку из таблицы по 2 конкретным полям
$table = [];
while (($row = $result_set->fetch_assoc()) != false)
{
    $table[] = $row;
}
print_r($table);

echo '<br/>---------------------------------------------------------<br/>';

$result_set = $mysqli->query('SELECT `name`, `balance` FROM `secret_user` WHERE `email` = \'vasya@mail.ru\''); // sql запрос на выборку из таблицы по конкретному значению емайла
$table = [];
while (($row = $result_set->fetch_assoc()) != false)
{
    $table[] = $row;
}
print_r($table);

echo '<br/>---------------------------------------------------------<br/>';

$result_set = $mysqli->query('SELECT `name`, `email` FROM `secret_user` WHERE `email` LIKE \'%v%\''); // sql запрос на выборку из таблицы, вывести где в email есть буква v (% означает что сколько угодно символов до V и сколько угодно после может быть)
$table = [];
while (($row = $result_set->fetch_assoc()) != false)
{
    $table[] = $row;
}
print_r($table);

echo '<br/>---------------------------------------------------------<br/>';

$result_set = $mysqli->query('SELECT `name`, `email` FROM `secret_user` WHERE `id` IN (2, 5, 6)'); // sql запрос на выборку из таблицы, по заданнаму значению id
$table = [];
while (($row = $result_set->fetch_assoc()) != false)
{
    $table[] = $row;
}
print_r($table);

echo '<br/>---------------------------------------------------------<br/>';

// далее совмещение нескольких условий в запросе sql (логические операторы И(AND) и ИЛИ(OR))

$result_set = $mysqli->query("SELECT `name`, `id`, `email` FROM `secret_user` WHERE `id` IN (2, 5, 6) AND `email` LIKE '%v%'"); // sql запрос на выборку из таблицы, по заданнаму значению id и полю email содержащим букву V
$table = [];
while (($row = $result_set->fetch_assoc()) != false)
{
    $table[] = $row;
}
print_r($table);

echo '<br/>---------------------------------------------------------<br/>';

$result_set = $mysqli->query("SELECT `name`, `id`, `email` FROM `secret_user` WHERE `id` IN (2, 5, 6) OR `email` LIKE '%v%'"); // sql запрос на выборку из таблицы, по заданнаму значению id или полю email содержащим букву V
$table = [];
while (($row = $result_set->fetch_assoc()) != false)
{
    $table[] = $row;
}
print_r($table);

echo '<br/>---------------------------------------------------------<br/>';

$result_set = $mysqli->query("SELECT `name`, `id`, `email` FROM `secret_user` WHERE (`id` IN (2, 5, 6) OR `email` LIKE '%v%') AND `name` = 'Петр'"); // sql запрос на выборку из таблицы, по заданнаму значению id или полю email содержащим букву V
$table = [];
while (($row = $result_set->fetch_assoc()) != false)
{
    $table[] = $row;
}
print_r($table);

echo '<br/>---------------------------------------------------------<br/>';

$mysqli->close();

