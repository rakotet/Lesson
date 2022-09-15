<?php
  require_once "src/Base.php";

  header('HTTP/1.0 404 Not Found');

  $title = 'Страница не найдена';
  $content = '404';

  require_once 'html/main.php';
?>
