<?php
require_once 'database_class.php';

session_start();
$error = false; // устанавливаем флаг ошибки

if (isset($_POST['auth'])) // проверяем была ли переданна форма
    {
    $_SESSION['login'] = $_POST['login']; // открываем сессию записываем полученные из POST запроса переменные в сессию
    $_SESSION['password'] = md5($_POST['password']);
    $error = true;
    }

$iss = isset($_SESSION['login']) && isset($_SESSION['password']);

$search = 0;

if ($iss) {
    $pdo = new DataBase();
    $pdo->connect();
    $login = $pdo->searchLogin($_SESSION['login']);
    $password = $pdo->searchPassword($_SESSION['password']);
}

$auth = false;

if ($iss && $_SESSION['login'] === $login['login'] && $_SESSION['password'] === $password['password']) { // если введенные в форму данные совпадают с $login и $password то true
    $auth = true;
    $error = false;
    $search = $login['search'];
}

$pdo = null;
$login = null;
$password = null;


