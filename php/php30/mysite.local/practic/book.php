<?php
  require_once "src/Base.php";

  $id = $request->id ?? 0;

  if(is_numeric($id)) {
    $book = $db->getRowById('books', $id);

    if($book) {
      $title = $book[0]['title'];
      $content = 'book';
      $available_copies = $db->getCountRows('book_copies', '`book_id` = ? AND `return_date` IS NULL', [$book[0]['id']]);
      $unavailable_copies = $db->getCountRows('book_copies', '`book_id` = ? AND `return_date` IS NOT NULL', [$book[0]['id']]);;
      require_once 'html/main.php';
      exit;
    } 
  } 
  
  to404();
  
?>