<?php
  $A = 3;
  $b = 6;
  echo isset($a); // ф-я проверяет существует ли перевенная, возвращает true или false (тут вернет false т.к. $a и $A развые переменные (регистр ичитывается в php))
  echo '<br />';
  echo isset($b);
  echo '<br />';

  $x = 12;
  echo gettype($x); // ф-я возвращает тип переменной
  echo '<br />';
  $x = (double) $x; // приводим переменную к типу double
  echo gettype($x); 
  echo '<br />';
  
  $str = 'My String';
  echo 'Переменная str - это string ? : ';
  echo is_string($str); // ф-я проверяет является ли переменная string
  echo '<br />';

  $str_number = '970';
  echo (int) $str_number; // приводим string к int (если строка хранит число, если нет вернет 0)
  echo '<br />';

  echo is_numeric($str_number); // ф-я проверят хранит ли строка в себе число
  echo '<br />';

  unset($x); // ф-я удаляет переменную из оперативной памяти
  echo isset($x); // выведется пустота т.к. мы удалили эту переменную
  echo '<br />'; 

  
?>