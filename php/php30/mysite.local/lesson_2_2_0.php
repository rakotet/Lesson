<?php
  // основные типы данных в php int, double, string, bool, null, array, object

  $x = 11;
  echo $x;
  echo '<br />';
  echo PHP_INT_MAX; // максимальное чисто типа int в php (хранится в константе PHP_INT_MAX)
  echo '<br />';
  $y = $x;
  echo $y;
  echo '<br />';
  $x = 0b101; // присваиваем значение в двоичной системе (0b число)
  echo $x;
  echo '<br />';
  $d_1 = 1.7;
  echo $d_1;
  echo '<br />';
  $d_2 = 3.5e5; // 3.5 * 10 в степени 5
  echo "d_1 = $d_1; d_2 = $d_2;"; // через "" можно выводить переменные а не только текст, но тратит больше ресурсов на обработку
  echo '<br />';
  $s = 'My String';
  echo "s = $s <br />";
  $b_0 = false;
  $b_1 = true;
  echo "b_0 = $b_0; b_1 = $b_1;<br />";
  $obj = null;
  echo $obj;
  echo '<br />';
?>