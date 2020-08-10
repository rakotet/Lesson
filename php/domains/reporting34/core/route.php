<?php
require_once 'session_class.php';

if (isset($_GET['f']) && $_GET['f'] == 'logout') {
    unset($_SESSION['login']);
    unset($_SESSION['password']);
    session_destroy();
}

if ($auth) {
    header('Location: http://reporting34/view/main_view.php');
}

if (isset($_GET['f']) && $_GET['f'] == 'slu') {
    header('Location: http://reporting34/view/slu_view.php');
}