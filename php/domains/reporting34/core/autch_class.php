<?php
require_once 'session_class.php';

if(!isset($_SESSION['login'])){ // если не авторизован переход к авторизации
    header("Location: /");
    exit;
}