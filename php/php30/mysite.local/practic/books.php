<?php
  require_once "src/Base.php";

  $title = 'Книги';
  $content = 'books';

  $books = $db->getRows('books', order_by: 'title');

  require_once 'html/main.php';
?>