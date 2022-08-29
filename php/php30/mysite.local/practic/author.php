<?php
  require_once "src/Base.php";

  $id = $request->id ?? 0;

  if(is_numeric($id)) {
    $author = $db->getRowById('authors', $id);

    if($author) {
      $title = $author[0]['name'];
      $content = 'author';
      $books = $db->getRows('books', '`author_id` = ?', [$author[0]['id']], 'title');
      require_once 'html/main.php';
      exit;
    } 
  } 
  
  to404();
  
?>