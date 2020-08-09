<?php
require_once 'bd_authorization_class.php';

session_start();

$error = false; // устанавливаем флаг ошибки
if (isset($_POST['auth'])) // проверяем была ли переданна форма
{
    $_SESSION['login'] = $_POST['login']; // открываем сессию записываем полученные из POST запроса переменные в сессию
    $_SESSION['password'] = md5($_POST['password']);
    $error = true;
}

if (isset($_GET['f']) && $_GET['f'] == 'logout') // проверяем есть ли GET запрос f и если он равен logout, то удаляем сесси логина и пароля
{
    unset($_SESSION['login']);
    unset($_SESSION['password']);
}

$iss = isset($_SESSION['login']) && isset($_SESSION['password']);

if ($iss) {
    $pdo = new BdAuthorization();
    $pdo->connect();
    $login = $pdo->searchLogin($_SESSION['login']);
    $password = $pdo->searchPassword($_SESSION['password']);
}

$auth = false;

if ($iss && $_SESSION['login'] === $login['login'] && $_SESSION['password'] === $password['password']) { // если введенные в форму данные совпадают с $login и $password то true
    $auth = true;
    $error = false;
}

$pdo = null;
$login = null;
$password = null;
