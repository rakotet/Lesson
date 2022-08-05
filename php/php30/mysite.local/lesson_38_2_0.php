<?php
  define('DB_HOST', '127.0.0.1'); 
  define('DB_USER', 'root'); 
  define('DB_PASSWORD', 'root'); 
  define('DB_NAME', 'mysite'); 

  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); 
  if($mysqli->connect_errno) exit('Ошибка соединения с БД');
  echo $mysqli->character_set_name().'<br />'; 
  $mysqli->set_charset('utf8mb4'); 

  $mysqli->query('CREATE DATABASE `mynewbd`'); // запрос на создание новой БД, если на сервере нет базы с таким названием
  $mysqli->query('DROP DATABASE `mynewbd`'); // запрос на удаление БД

  $mysqli->close(); 
?>