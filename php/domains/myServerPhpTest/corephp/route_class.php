<?php
require_once 'session_class.php';

if (isset($_GET['f']) && $_GET['f'] == 'logout') { // кнопка выхода из сессии
    unset($_SESSION['login']);
    unset($_SESSION['password']);
    session_destroy();
}

if ($auth) {
    header('Location: /main.php'); // если прошла авторизация переходим на главную
}

