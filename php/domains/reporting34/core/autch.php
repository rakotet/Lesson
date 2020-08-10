<?php
require_once 'session_class.php';

if(!isset($_SESSION['login'])){
    header("Location: http://reporting34/");
    exit;
}