<?php
  $work = function($a, $b) {
    return $a * $b;
  };

  echo $work(1, 2).'<br />';

  function func($arr, $condition = false) {
    if(!(count($arr) % 2 == 0)) {
      echo 'Массив имеет не четное количество элементов <br />';
      return;
    }
    
    foreach($arr as $value) {
      if(!is_int($value)) {
        echo 'В массиве есть не только числа <br />';
        return;
      }
    }

    for($i = 0; $i < count($arr); $i++) {
      if($i % 2 != 0 && $i != 0) continue;
      echo $condition($arr[$i], $arr[$i + 1]).'<br />';
    }

  }

  func([1, 2, 3, 5, 1, 3], $work);

  $a = 2;
  $b = 3;

  $zamikanie = function() use($a, $b) {
    return $a + $b;
  };

  echo $zamikanie().'<br />';

  function strelka($arr, $arroy) {
    $arr_1 = [];

    foreach($arr as $v) {
      $arr_1[] = $arroy($v);
    }

    return $arr_1;
  }

  foreach((strelka([1, 2, 3], fn($x) => $x * 2)) as $v) echo "$v, ";
?>