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
    <?php if($auth_user) { ?>
      <p>Здравствуйте, <?=$auth_user[0]['name']?></p>
    <?php } else { ?>
      <form name="auth" action="" method="post">
        <h4>Вход на сайт</h4>
        <?php if($error) { ?>
          <p style="color: red;">Не верные логин и/или пароль!</p>
        <?php } ?>
        <p>
          <label>Логин</label>
          <input type="text" name="login">
        </p>
        <p>
          <label>Пароль</label>
          <input type="password" name="password">
        </p>
        <p>
          <input type="submit" name="auth" value="Войти на сайт">
        </p>
      </form>
    <?php }?>
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
      <?php if($auth_user) { ?>
        <li>
          <a href="mybooks.php">Мои книги</a>
        </li>
        <li>
          <a href="?<?=http_build_query(array_merge($_GET, ['logout' => 1]))?>">Выход</a>
        </li>
      <?php } ?>
    </ul>
  </div>
  <div style="margin-left: 300px;"><?php require_once "html/$content.php"?></div>
</body>
</html>