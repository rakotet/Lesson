<?php
  // Анонимные ф-ии не имеют имени, их можно записывать в переменные, и после них необходима точка с запятой.

  $hello = function($string) {
    echo "$string <br />";
  };

  $hello('World');

  function test($a, $func) {
    $arr = [];

    for($i = 0; $i <= $a; $i++) {
      $arr[] = $func($i);
    }

    return $arr;
  }

  $arr = test(5, function($x) { // передаём в качесте параметра ананимную ф-ю
    return $x ** 2;
  });

  foreach($arr as $v) echo "$v ";

  echo '<br />';

  function summ($arr, $condition = false) {
    $sum = 0;

    foreach($arr as $value) {
      if(!$condition || $condition($value)) $sum += $value;
    }

    return $sum;
  }

  $isPositive = function($value) {
    return $value > 0;
  };

  $isNagative = function($value) {
    return $value < 0;
  };

  $arr = [2, 3, -5, -7, 5];

  echo summ($arr).'<br />';
  echo summ($arr, $isPositive).'<br />';
  echo summ($arr, $isNagative).'<br />';
?>