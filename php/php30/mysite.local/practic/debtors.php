<?php
  require_once "src/Base.php";

  if(!$auth_user || $auth_user[0]['type'] < LIBRARIAN) to403();

  if(isset($request->return)) {
    $id = $request->id ?? 0;
    if(is_numeric($id)) {
      $db->update('book_copies', ['user_id', 'return_date'], [null, null], '`id` = ?', [$id]);
    }
  }

  if(isset($request->give)) {
    $book_id = $request->book_id ?? false;
    $user_id = $request->user_id ?? false;
    if(is_numeric($user_id) && is_numeric($book_id)) {
      $book = $db->getRowById('books', $book_id);
      $user = $db->getRowById('users', $user_id);
      if($book && $user) {
        $return_date = time() + DURATION_RENT; // крайнее время возврата книги
        $book_copy = $db->getRowByWhere('book_copies', '`return_date` IS NULL AND `book_id` = ?', [$book_id]);
        $db->update('book_copies', ['user_id', 'return_date'], [$user_id, $return_date], '`id` = ?', [$book_copy[0]['id']]);
      }
    }
  }

  $title = 'Должники';
  $content = 'debtors';

  $book_copies = $db->getRows('book_copies', '`return_date` IS NOT NULL', order_by: 'return_date');
  $book_ids = [];
  $user_ids = [];

  foreach($book_copies as $book_copy) {
    $book_ids[] = $book_copy['book_id'];
    $user_ids[] = $book_copy['user_id'];
  }

  $books = $db->getRowByIds('books', array_values(array_unique($book_ids)));
  $users = $db->getRowByIds('users', array_values(array_unique($user_ids)));

  $all_users = $db->getRows('users', order_by: 'login');
  $available_book_copies = $db->getRows('book_copies', '`return_date` IS NULL');
  $available_book_ids = [];

  foreach($available_book_copies as $book_copy) {
    $available_book_ids[] = $book_copy['book_id'];
  }

  $available_books = $db->getRowByIds('books', array_values(array_unique($available_book_ids)));

  require_once 'html/main.php';
?>