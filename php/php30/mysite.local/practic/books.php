<?php
  require_once "src/Base.php";

  $title = 'Книги';
  $content = 'books';

  $books = $db->getRows('books', order_by: 'title'); // order_by именой аргемент ф-и новая возможность php 8

  require_once 'html/main.php';
?>