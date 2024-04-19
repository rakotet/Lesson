<?php
  require_once "src/Base.php";

  $title = 'Авторизация';

  if($auth_user /*|| $cookie_result*/) {
    header('Location: /page/app');
    
  } else {
    //header("Location: ".SSO);
    $content = 'html/authorization';
  }
  

  require_once 'html/main.php';
?>