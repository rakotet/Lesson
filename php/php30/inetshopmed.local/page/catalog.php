<?php
  require_once "../src/Base.php";

  $title = 'Каталог';
  $content = '../html/catalog';
  $catalog = $db->getCatalog('catalog');

  require_once "../html/main.php";
?>