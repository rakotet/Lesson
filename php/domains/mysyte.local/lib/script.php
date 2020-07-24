<?php
$login = $_COOKIE['login']?? false; // если такое значение есть в массиве, то записываем его в переменную
$password = $_COOKIE['password']?? false;
if ($login !== 'Admin' || $password !== '123')
{
    echo 'Доступ закрыт';
    exit; // завершаем скрипт
}
$x = $_POST['x']?? false;
$y = $_POST['y']?? false;
$x = htmlspecialchars($x);
$y = htmlspecialchars($y);
if (is_numeric($x) && is_numeric($y)) echo $x + $y;
else echo 'error';