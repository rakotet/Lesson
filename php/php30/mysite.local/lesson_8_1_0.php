<?php
  $i = 0;

  while($i < 5) {
    echo "$i <br />";
    $i++;
  }

  echo '------------<br />';

  $i = 0;

  while(++$i < 5) echo "$i <br />";

  echo '------------<br />';

  $summ = 0;
  $n = 10;
  $i = 1;

  while($i <= $n) {
    $summ += $i;
    $i++;
  }

  echo "Сумму чисел от 1 до $n равна $summ <br />";

  echo '------------<br />';

  $x = 0;

  do {
    echo "$x <br />";
  } while ($x > 10);

  
?>