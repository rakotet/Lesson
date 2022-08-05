<?php
  define('DB_HOST', '127.0.0.1'); 
  define('DB_USER', 'root'); 
  define('DB_PASSWORD', 'root'); 
  define('DB_NAME', 'mysite'); 

  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); 
  if($mysqli->connect_errno) exit('Ошибка соединения с БД');
  echo $mysqli->character_set_name().'<br />'; 
  $mysqli->set_charset('utf8mb4'); 

  // $query = "INSERT INTO `secret_users` (`name`, `email`, `password`, `ip_reg`, `date_reg`) 
  //           VALUES ('Иванов Иван', 'ivamov3@mysite.local', MD5('1234567890'), INET_ATON('127.0.0.1'), UNIX_TIMESTAMP());";
            
  // echo $mysqli->query($query).'<br />'; // выполняем запрос на добавление новой записи в таблицу, в рамках одного запроса можно добавлять до 1000 строк в таблице, просто указывая через запятую значения для следующей записи
  // echo $mysqli->error.'<br />';

  if(isset($_POST['reg'])) {
    $name = $_POST['name'] ?? false;
    $email = $_POST['email'] ?? false;
    $password = $_POST['password'] ?? false;
    $result = false;
    $error = '';
    if(is_string($name) && is_string($email) && is_string($password)) {
      $name = $mysqli->real_escape_string(htmlspecialchars($name)); // ф-я возвращает обезопасенную строку для sql (!!!всегда пропускать через неё для безопастности) а вторая устраняет уязвимость тегов если они есть
      if(mb_strlen($name) < 2) $error = 'Слишком короткое имя';
      $email = $mysqli->real_escape_string(htmlspecialchars($email)); 
      $password = $mysqli->real_escape_string(htmlspecialchars($password)); 
      $ip_reg = ip2long($_SERVER['REMOTE_ADDR']); // ip адрес пользователя
      $date = time(); // время регистрации в секундах
      $query = "INSERT INTO `secret_users` (`name`, `email`, `password`, `ip_reg`, `date_reg`) 
             VALUES ('$name', '$email', MD5('$password'), '$ip_reg', '$date');";
      $result = $mysqli->query($query);
      echo $mysqli->insert_id; // содержит id последней записи
    }
  }

  $mysqli->close(); 

  // Ниже простейший пример реализации регистрации
?>
<?php if(isset($result)) { ?>
  <?php if($result) { ?>
    <p>Регистрация прошла успешно!</p>
  <?php } else { ?>
    <p>Ошибка при регистрации: <?=$error?>!</p>
  <?php } ?>
<?php } ?>
<form action="" name="reg" method="post">
  <p>
    Имя: <input type="text" name="name">
  </p>
  <p>
    email: <input type="email" name="email">
  </p>
  <p>
    Пароль: <input type="password" name="password">
  </p>
  <input type="submit" name="reg" value="Зарегистрироваться">
</form>