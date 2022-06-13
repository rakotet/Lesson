<?php
  $getNumber = function($arr) {
    if(count($arr) == 0) {
      echo 'Передан пустой массив';
      return;
    }

    $summ = 0;

    foreach($arr as $v) {
      if(!is_numeric($v)) {
        echo 'В переданном массиве не только числа';
        return;
      }

      $summ += $v;
    }

    return $summ / count($arr);
  };

  echo $getNumber([5, 3, 4]);

  echo '<br />';

  function generator($arr, $callback) {
    foreach($arr as $v) yield $callback($v);
  }
    
  foreach(generator([[1, 2, 3], [2, 3, 4]], $getNumber) as $v) echo "$v, ";

  echo '<br />';

  $arr = [[1, 2, 3], [2, 3, 4]];

  foreach($arr as $value) {
    $summ = 0;
    foreach($value as $v) {
      $summ += $v;
    }

    echo ($summ / count($value)).', ';
  }

  echo '<br />';

  $arr = [
    'arr_1' => [
      'value2' => [
        'v' => 1
      ]
    ],
    'arr_2' => [
      'value3' => [
        'v1' => 2
      ]
    ]
  ];

  print_r($arr);

  echo '<br />';

  function getPre($arr) {
    echo '<pre>';
    print_r($arr);
    echo '</pre>';
  }

  getPre($arr);
?>