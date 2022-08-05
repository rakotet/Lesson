<?php
   define('DB_HOST', '127.0.0.1'); 
   define('DB_USER', 'root'); 
   define('DB_PASSWORD', 'root'); 
   define('DB_NAME', 'mysite'); 
   define('DB_PORT', '3310'); 

   // PDO встроенная в PHP библиотека для более удобной работы с различными БД

   try {
      $pdo = new PDO('mysql:host='.DB_HOST.';port='.DB_PORT.';dbname='.DB_NAME, DB_USER, DB_PASSWORD); // создаём объект класса PDO который хранит в себе настройки подключения к БД
   } catch(PDOException $e) {
      echo 'Ошибка при подключении к БД: '.$e->getMessage();
      echo '<br />';
   }

   $query = 'SELECT * FROM `secret_users`';
   $result = $pdo->query($query); // выполняем sql запрос на выборку
   $row = $result->fetch(PDO::FETCH_ASSOC); // получаем данные первой строки по запросу, в аргумент передаём настройку для получения нормального массива а не дублированного
   print_r($row);
   echo '<br />';

   $table = $result->fetchAll(PDO::FETCH_ASSOC); // получаем все строки полученные по запросу а не только первую как в примере выше.
   print_r($table);
   echo '<br />';

   try {
      $query = 'INSERT INTO `secret_articles` (`user_id`, `title`, `text`, `date`) VALUES (1, "Заголовок статьи", "Текст новой статьи...", UNIX_TIMESTAMP())';
      $result = $pdo->exec($query); // выполняет sql запрос на добавление новой строки в БД, при этом возвращает количество затронутых строк
      $last_id = $pdo->lastInsertId(); // возвращает id последней добавленной записи
      echo $result.'<br />';
   } catch(PDOException $e) {
      echo 'Ошибка в запросе на добавление записи: '.$e->getMessage();
      echo '<br />';
   }
   
   $query = 'UPDATE `secret_articles` SET `date` = `date` + 1';
   $result = $pdo->exec($query); // выполняем sql запрос на изменение данных в таблице, возвращает количество затронутых строк
   echo $result.'<br />';

   $query = 'DELETE FROM `secret_articles` WHERE `id` ='.$last_id;
   $result = $pdo->exec($query); // выполняем sql запрос на удаление строки из БД
   echo $result.'<br />';

   // Ниже про безопастность при работе с PDO

   $query = 'SELECT * FROM `secret_users` WHERE `date_reg` >= ? AND `id` < ?'; // ? - это например данные от пользователя которые нам надо обезопасить
   $query = $pdo->prepare($query); // возвращает объект с обезопасиным нашим запросом
   $query->execute([1659284597, 4]); // в массиве передаются данные которые подставляются вместо ? в нашем запросе по порядку
   $table = $query->fetchAll(PDO::FETCH_ASSOC); 
   print_r($table);
   echo '<br />';

   $query = 'SELECT * FROM `secret_users` WHERE `email` = :email'; // вместо знаков ? можно стивить именные параметры (:имя)
   $query = $pdo->prepare($query);
   $query->bindValue(':email', 'vasiy2zvv@mysite.local'); // в массиве указываем 1 арг что заменить в запросе, 2 арг на что заменить
   $query->execute(); // выполняем запрос
   $table = $query->fetchAll(PDO::FETCH_ASSOC); 
   print_r($table);
   echo '<br />';

   $pdo = null; // закрываем соединение с БД
?>