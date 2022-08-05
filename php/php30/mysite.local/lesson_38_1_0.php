<?php
  define('DB_HOST', '127.0.0.1'); // адрес где находится БД
  define('DB_USER', 'root'); // Логин пользователя БД
  define('DB_PASSWORD', 'root'); // Пароль пользователя БД
  define('DB_NAME', 'mysite'); // имя БД

  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); // создаём объект для подключения к базе данных используя встроенный в php класс mysqli, можно передавать еще один параметр это порт
  if($mysqli->connect_errno) exit('Ошибка соединения с БД'); // если ф-я возвращает не ноль, то завершаем скрипт с выводом сообщения
  echo $mysqli->character_set_name().'<br />'; // ф-я возвращает кодировку подключения к БД
  $mysqli->set_charset('utf8mb4'); // меняем кодировку подклчюения к БД
  $mysqli->close(); // закрываем соединение с БД
?>