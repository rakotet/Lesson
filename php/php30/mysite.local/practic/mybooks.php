<?php
  require_once "src/Base.php";

  if(!$auth_user) exit('Нет прав для просмотра!');

  $title = 'Мои книги';
  $content = 'mybooks';

  $book_copies = $db->getRows('book_copies', '`user_id` = ?', [$auth_user[0]['id']], 'return_date');

  $ids = [];
  foreach($book_copies as $copy) $ids[] = $copy['book_id'];
  $ids = array_values(array_unique($ids));

  $books = $db->getRowByIds('books', $ids);
  
  require_once 'html/main.php';
?>