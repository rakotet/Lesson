<?php
   $x = 7;
   if ($x < 10) { 
      echo "х меньше 10";
   }
   else { 
      echo "x больше 10 или равен 10";
   }

   echo "<br />";

   if ($x > 7) {
      echo "x больше 7";
   }

   elseif ($x < 7) {
      echo "x < 7";
   }

   elseif ($x > 10) {
      echo "x >10";
   }

   else {
      echo "x = 7";
   }

   echo "<br />";

   $a = 7;
   $b = 10;

   if ($a > $b || $b === 10) echo "истина"; //если всего одна команда то фигурные скобки можно не ставить
   else "ложь";

   if (isset($_GET['com'])) $com = $_GET['com']; //проверяем существует ли переменная com и только тогда начинаем её записывать ($_GET встроенный массив имеющий параметры для GET запроса)
   else $com = false;
   
   echo "<br />";

   if ($com == 'add') {
      $summa = $a + $b;
      echo 'a + b = '.$summa;
   }
   elseif ($com == 'mult') {
      $mult = $a * $b;
      echo 'a * b = '.$mult;
   }
   elseif ($com) echo "Неизвестная операция";
?>

<div>
   <a href="?com=add">Сложить</a> <!--GET запрос, начинается с ? состоит из ключ - значение, где com это ключ (имя переменной) а add (значение переданного параметра) значение-->
   <a href="?com=mult">Умножить</a>
</div>