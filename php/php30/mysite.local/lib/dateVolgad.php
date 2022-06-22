<?php
  $array = explode("\n", file_get_contents('1.txt'));
  
  $time = time();

  foreach($array as $str) {
    $arr = explode(".", $str);
    $sekonds = mktime(1, 0, 0, (int) $arr[1], (int) $arr[0], (int) $arr[2]);
    $total = floor(($time - $sekonds) / 86400);
    $year = floor($total / 365);
    $month = floor(($total - ($year * 365)) / 30);
    $day = floor($total - ($year * 365 + $month * 30));

    echo "$year лет $month месяцев $day дня<br />";
  }

  
?>