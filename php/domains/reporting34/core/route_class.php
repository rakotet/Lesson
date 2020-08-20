<?php
require_once 'session_class.php';

if (isset($_GET['f']) && $_GET['f'] == 'logout') { // кнопка выхода из сессии
    unset($_SESSION['login']);
    unset($_SESSION['password']);
    session_destroy();
}

if ($auth) {
    header('Location: /view/main_view.php'); // если прошла авторизация переходим на главную
}

if (isset($_GET['f']) && $_GET['f'] == 'slu') {
    header('Location: /view/slu_create_view.php'); // нажимаем написать служебку и переходим на страницу формы
}

if (isset($_GET['f']) && $_GET['f'] == 'main') {
    header('Location: /view/main_view.php'); // назад на главную
}

if (isset($_GET['f']) && $_GET['f'] == 'search') {
    header('Location: /view/search_slu_view.php'); // на поиск служебки
}

if (isset($_GET['f']) && $_GET['f'] == 'download') {
    header('Location: /view/download_view.php'); // на загрузку файлов
}

if (isset($_POST['slujebka'])) { // запись служебки в базу данных
    $handlerSlu = new DataBase();
    $handlerSlu->connect();
    $handlerSlu->handlerSlu($_SESSION['login'], $_POST['list'], $_POST['topic'], $_POST['text']);

}