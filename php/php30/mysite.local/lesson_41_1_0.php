<?php
  define('DB_HOST', '127.0.0.1'); 
  define('DB_USER', 'root'); 
  define('DB_PASSWORD', 'root'); 
  define('DB_NAME', 'mysite'); 

  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); 
  if($mysqli->connect_errno) exit('Ошибка соединения с БД');
  $mysqli->set_charset('utf8mb4'); 

  // Запрос на обновление структура: Обновить UPDATE `имя таблицы` какие столбцы SET `столбец` = "Значение", `столбец` = "Значение" где параметры выборки WHERE...

  $query = 'UPDATE `secret_articles` SET `user_id` = 2'; // запрос на обновление значений в поле user_id во всей таблице
  echo $mysqli->query($query).'<br />';

  $query = 'UPDATE `secret_articles` SET `user_id` = 3, `date` = `date` + 1'; // обновляем значения в двух столбцах, в date увеличиваем текущее значение на 1
  echo $mysqli->query($query).'<br />';

  $query = 'UPDATE `secret_articles` SET `user_id` = 5, `date` = `date` + 1 WHERE `id` = 2'; // обновляем значения в только в тех строках где id равно 2 (тоесть обновляем значения в контретных ячейках конкретной строки таблицы)
  echo $mysqli->query($query).'<br />';

  $query = 'INSERT INTO `secret_articles` (`user_id`, `title`, `text`, `date`) VALUES (1, "Новая статья", "Текст", UNIX_TIMESTAMP())'; // добавляем строку в БД
  echo $mysqli->query($query).'<br />';
  $last_insert_id = $mysqli->insert_id; // id последней записи 

  $query = "DELETE FROM `secret_articles` WHERE `id` = $last_insert_id"; // удаляем строку из БД указав её id
  echo $mysqli->query($query).'<br />';

  // Как использовать SELECT внутри SELECT
  $query = 'SELECT * FROM `secret_articles` WHERE `user_id` = (SELECT `id` FROM `secret_users` WHERE `email` = "zzzzzzzzzzzsdsd")'; // выводим строку чей user_id совтпадает с id в другой таблице в которой этот id ищем по email

  $mysqli->close(); 
?>