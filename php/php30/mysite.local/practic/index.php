<?php
  require_once "src/Config.php";

  $db = Database::getDBO();

  $title = 'Библиотека';
  $content = 'index';

  $books = $db->getCountRows('books');
  $book_copies = $db->getCountRows('book_copies');
  $book_copies_available = $db->getCountRows('book_copies', '`return_date` IS NULL');
  $authors = $db->getCountRows('authors');
  $users = $db->getCountRows('users');

  require_once 'html/main.php';
?>