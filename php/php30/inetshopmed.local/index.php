<?php
  require_once "src/Base.php";

  $title = 'Главная';
  $content = 'html/catalog';
  
  $catalog = $db->getCatalog('catalog');

  require_once 'html/main.php';
?>