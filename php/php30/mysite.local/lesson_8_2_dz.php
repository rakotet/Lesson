<?php
  $i = 10;
  $n = 40;
  $summ = 0;

  for(; $i <= $n; $i++) {
    if(($i % 2) != 0) $summ += $i;
  }

  $i = 10;

  echo "Сумма нечетных чисел от $i до $n равна $summ <br />";

  $op = $_GET['op'] ?? 0;

  //if($op) echo "op = $op";

  switch($op) {
    case 3:
      echo 'Три';
      break;
    case 4:
      echo 'Четыре';
      break;
    case 0:
      break;
    default:
      echo 'Нет представления этого числа в виде строки';
  }
?>

<div>
  <a href="?op=3">3</a>
  <a href="?op=4">4</a>
  <a href="?op=5">5</a>
</div>