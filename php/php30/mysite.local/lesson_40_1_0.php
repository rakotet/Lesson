<?php
  define('DB_HOST', '127.0.0.1'); 
  define('DB_USER', 'root'); 
  define('DB_PASSWORD', 'root'); 
  define('DB_NAME', 'mysite'); 

  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); 
  if($mysqli->connect_errno) exit('Ошибка соединения с БД');
  $mysqli->set_charset('utf8mb4'); 

  $echoQuery = function($query) use($mysqli) {
    $result_set = $mysqli->query($query); // выполняекм sql запрос на выборку
    echo $result_set->num_rows.'<br />'; // возвращает количество строк
    $table = [];
    while($row = $result_set->fetch_assoc()) { // записываем на каждой итерации одну строку из таблицы sql в массив в виде массива
      $table[] = $row;
    }
    print_r($table);
    echo '<br />------------------------<br />';
  };

  $query = 'SELECT * FROM `secret_users`'; // запрос на выборку SELECT возвращает объект, * - данный запрос вернет все строки из таблицы
  $echoQuery($query);

  $query = 'SELECT `email`, `balance` FROM `secret_users`'; // запрос на выборку значений двух столбцов из таблицы
  $echoQuery($query);

  $query = 'SELECT `email`, `balance` FROM `secret_users` WHERE `email` = "ivan@mysite.local"'; // запрос на выборку значений двух столбцов из таблицы где емаил равен конкретно указанному значению
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `email` LIKE "v%"'; // выводим все строки где емаил начинается на букву v (LIKE - ищет указанную подстроку, % - далее любые символы в любом количестве)
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `email` IN ("ivan@mysite.local", "vasiy2zvv@mysite.local")'; // выводим все строки где емаил равен (email и email)
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `id` IN (1, 4) AND `email` LIKE "%z%"'; // выводим все строки где id равно 1 и 4, и где email содержит в себе букву z
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `id` IN (1, 2, 4) OR `email` LIKE "%vasiy%"'; // выводим строки у которых id равно 1, 2, 4 или email содержит подстроку vasiy
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE (`id` IN (1, 2, 4) OR `email` LIKE "%vasiy%") AND `name` = "aaassss"'; // можно комбинировать все конструкции в более сложные выражения спомощью скобок, тут выведутся строки где id равно 1, 2, 4 или email содержит подстроку vasiy и имя строго равно aaassss
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `id` IN (1, 3 ,6) ORDER BY `date_reg`'; // вывести строки с id 1, 3, 6 и ORDER BY сортировать по возрастанию по столбцу date_reg
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `id` IN (1, 3 ,6) ORDER BY `date_reg` DESC'; // ORDER BY DESC - сортировать по убыванию
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `id` IN (1, 3 ,6) ORDER BY `name`, `email`'; // можно выполнять сортировку по возрастанию сразу по нескольким столбцам
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `id` IN (1, 3 ,6) ORDER BY `name` DESC, `email` DESC'; // можно выполнять сортировку сразу по нескольким столбцам и по убыванию
  $echoQuery($query);

  // выборка всех строк из двух таблиц делается через INNER JOIN после которого идет условие выборки, так же есть возможность добавлять в результирующий массив новое поля как бы псевдоним `secret_users`.`id` as `u_id`
  $query = 'SELECT *, `secret_users`.`id` as `u_id` FROM `secret_users` INNER JOIN `secret_articles` ON `secret_users`.`id` = `secret_articles`.`user_id`'; 
  $echoQuery($query);

  $query = 'SELECT COUNT(`id`) as `count` FROM `secret_users`'; // COUNT - выводит количество записей по заданному столбцу, сделали ему псевдоним что бы проще было к нему обращатсья 
  $echoQuery($query);

  $query = 'SELECT SUM(`balance`) as `balance` FROM `secret_users`'; // SUM - ссумирует все значения переданного столбца, так же делаем ему псевдоним 
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` LIMIT 4'; // выводим первые четыре записи из таблицы, LIMIT ставится в самом конце запроса
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` LIMIT 1, 3'; // пропускаем количество записей в первом аргументе после LIMIT и выводим количество во втором аргументе
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` WHERE `email` LIKE "%v%" ORDER BY `name` LIMIT 1, 3'; // выводим строки в которых email содержит подстроку v, сортируем по имени по возрастанию, пропускаем первую запись и выводим три следующих записи
  $echoQuery($query);

  $query = 'SELECT * FROM `secret_users` ORDER BY RAND() LIMIT 2'; // выводим 2 случайные записи из таблицы
  $echoQuery($query);

  $mysqli->close(); 
?>