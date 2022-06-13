<?php
  $summ = 0;

  for($i = 0; $i <= 10; $i++) {
    if(($i % 2) == 0) $summ += $i;
  }

  echo "Сумма чётных чисей от 1 до 10 равна $summ <br />";

  $summ = 1;
  $f = 10;

  for($i = 2; $i <= $f; $i++) {
    if($i > $f) break;
    $summ *= $i;
  }

  echo "Факториал числа $f равен $summ";
?>