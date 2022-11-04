<?php
  require_once "../src/Base.php";

  $title = 'Главная';

  if($auth_user) {
    $content = '../html/content';
    $contentRight = '../html/contentRight';
  } else {
    header('Location: /');
  }
  
  
  

  require_once "../html/main.php";
?>