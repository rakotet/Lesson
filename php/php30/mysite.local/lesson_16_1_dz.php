<?php
  $arr = [10.55, 120.20, 10.55, 5.43, 250];

  foreach($arr as $k => $v) {
    $arr[$k] = round(($v - ($v * 0.25)), 2);
  }

  echo '<pre>';
  print_r($arr);
  echo '</pre>';

  echo '<br />-----------<br />';

  $arr = [];

  for($i = 0; $i < 10; $i++) {
    $arr[] = mt_rand(0, 100);
  }

  foreach($arr as $v) {
    echo base_convert($v, 10, 2).'<br />';
  }
?>