<?php
  define('DB_HOST', '127.0.0.1'); 
  define('DB_USER', 'root'); 
  define('DB_PASSWORD', 'root'); 
  define('DB_NAME', 'mysite'); 

  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); 
  if($mysqli->connect_errno) exit('Ошибка соединения с БД');
  echo $mysqli->character_set_name().'<br />'; 
  $mysqli->set_charset('utf8mb4'); 

  for($i = 0; $i < 5; $i++) { // создаём 5 таблиц БД первым запросом и добавляем индексы вторым запросом
    $mysqli->query("CREATE TABLE `test_$i` ( 
      `id` int(10) UNSIGNED NOT NULL,
      `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
      `date` int(10) UNSIGNED DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    echo $mysqli->error.'<br />'; // выводит ошибки если они есть 

    $mysqli->query("ALTER TABLE `test_$i`
      ADD PRIMARY KEY (`id`),
      ADD UNIQUE KEY `email` (`email`);");
  }

  for($i = 0; $i < 5; $i++) { 
    $mysqli->query("DROP TABLE `mysite`.`test_$i`"); // удаляем таблицы
  }

  $mysqli->close(); 
?>