<?php
require_once '../view/slu_view.php';

$handlerSlu = new DataBase();

if (isset($_POST['slujebka'])) {
    $handlerSlu->handlerSlu($_SESSION['login'], $_POST['list'], $_POST['text']);
    echo $_SESSION['login'].'<br/>';
    echo $_POST['list'].'<br/>';
    echo $_POST['text'].'<br/>';
}