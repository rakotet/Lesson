<?php
  session_start();
  $auth = false;
  $error = false;

  if(isset($_REQUEST['auth'])) {
    $_SESSION['login'] = $_REQUEST['login'] ?? '';

    if(isset($_REQUEST['password']) && is_string($_REQUEST['password'])) { // проверка что пароль должен быть обязательно строкой, т.к злоумышленники могут отправить массив и вызовут ошибку в лог файле.
      $_SESSION['password'] = md5($_REQUEST['password']) ?? ''; // хешируем пароль (хранить пароли в открытом виде большая уязвимость)
    }

    $error = true;
  }

  if(isset($_GET['logout'])) {
    unset($_SESSION['login']);
    unset($_SESSION['password']);
    header('Location: /lesson_34_2_0.php'); // выполняем редирект что бы исбавиться от всех GET запросов в адресной строке
  }

  $login = 'admin';
  $password = 'e10adc3949ba59abbe56e057f20f883e'; // это хешь от md5('123456');

  $check_login = $_SESSION['login'] ?? false;
  $check_password = $_SESSION['password'] ?? false;

  if($check_login === $login && $check_password === $password) {
    $auth = true;
    $error = false;
  }
  print_r($_REQUEST);
  echo '<br />';
  print_r($_SESSION);
?>
<?php if($auth) { ?>
  <p>Здравствуйте <b><?=$login?></b>!</p>
  <a href="?logout">Выход</a>
<?php } else { ?>
<?php if($error) { ?>
  <p>Неверный логин и\или пароль</p>
<?php } ?>
  <form action="" name="auth" method="post">
    <p>
      Логин: <input type="text" name="login">
    </p>
    <p>
      Пароль: <input type="password" name="password">
    </p>
    <p>
      <input type="submit" name="auth">
    </p>
  </form>
<?php } ?>