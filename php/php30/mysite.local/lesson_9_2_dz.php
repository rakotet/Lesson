<?php
  $arr = [1, 4, 2, 5, 7, 4, 0, 3, 1, 9];
  $summ = 0;

  for($i = 0; $i < count($arr); $i++) {
    $summ += $arr[$i];
  }

  echo $summ.'<br />';


  $i = 0;
  $pr = 1;

  while($i < count($arr)) {
    if((($i + 1) % 2) == 0) $pr *= $arr[$i];
    $i++;
  }

  echo $pr;
?>