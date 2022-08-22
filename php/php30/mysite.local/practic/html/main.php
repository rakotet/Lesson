<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?=$title?></title>
</head>
<body>
  <div style="float: left;">
    <h4>Меню сайта</h4>
    <ul>
      <li>
        <a href="index.php">Главная</a>
      </li>
      <li>
        <a href="books.php">Книги</a>
      </li>
      <li>
        <a href="authors.php">Авторы</a>
      </li>
    </ul>
  </div>
  <div style="margin-left: 300px;"><?php require_once "html/$content.php"?></div>
</body>
</html>