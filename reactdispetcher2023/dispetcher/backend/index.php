<?php
  require_once "src/Base.php";

  $title = 'Авторизация';

  if($auth_user) {
    header('Location: /page/app');
  } else {
    $content = 'html/authorization';
  }
  

  require_once 'html/main.php';
?>