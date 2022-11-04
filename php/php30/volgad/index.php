<?php
  require_once "src/Base.php";

  $title = 'Главная';

  if($auth_user) {
    header('Location: /page/content');
  } else {
    $content = 'html/authorization';
  }
  
  
  

  require_once 'html/main.php';
?>