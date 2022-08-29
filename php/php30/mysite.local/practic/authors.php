<?php
  require_once "src/Base.php";

  $title = 'Авторы';
  $content = 'authors';

  $authors = $db->getRows('authors', order_by: 'name'); // order_by именой аргемент ф-и новая возможность php 8

  require_once 'html/main.php';
?>