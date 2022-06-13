<?php
  $arr = [
    [
      'name' => 'Alex',
      'age' => '31'
    ],
    [
      'name' => 'Igor',
      'age' => '35'
    ],
    [
      'name' => 'Michael',
      'age' => '20'
    ]
  ];

  $num = 0;

  foreach($arr as $value) {
    foreach($value as $k => $v) {
      if($k == 'age') $num += $v;
    }
  }

  $num = $num / count($arr);

  echo "Средний возраст равен $num <br />";

  $arr_1 = [1, 3, 5, 1];
  $arr_2 = [1, 3, 5, 1, 4, 8, 9, 10];

  foreach($arr_2 as $v) {
    $arr_1[] = $v;
  }

  foreach($arr_1 as $v) echo "$v, ";

  echo '<br />';

  foreach($arr_1 as $k => $v) {
    if(($v % 2) != 0) {
      echo "$v, ";
    }
  }
?>