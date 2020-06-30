<?php
   for ($i = 0; $i < 3; $i++) echo "Hello ";
   echo "<br/>";

   for ($i = 10; $i >= 0; $i -= 2) echo "$i, ";
   echo "<br/>";

   $summa = 0;
   $n = 10;

   for ($i = 1; $i <= $n; $i++) {
      $summa += $i;
      echo "<br/>".$summa;
   }
   echo "<br/> сумма чисел от 1 до $n равна $summa";

   echo "<br/>";

   for ($i = 0; $i < 10; $i++) {
      if ($i == 3) continue; //continue переходит к следущей итерации цикла пропуская код ниже
      echo $i."<br/>";
      if ($i == 7) break; //break останавливает выполнение цикла
   }
?>
