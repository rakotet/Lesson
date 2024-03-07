<?php
  require_once "src/Base.php";

  $title = 'Авторизация';

  if($auth_user || $cookie_result) {
    $content = 'html/authorization';
    
  } else {
    header("Location: ".SSO);
  }
  

  require_once 'html/main.php';
?>