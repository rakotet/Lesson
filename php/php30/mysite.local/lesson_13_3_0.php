<?php
  $n_1 = 1;
  $n_2 = 3;

  $summ = function() use($n_1, $n_2) {
    return $n_1 + $n_2;
  };

  echo $summ().'<br />';

  // Тоже самое но с использованием стрелочной ф-ии

  $sum = fn() => $n_1 + $n_2; // стрелочные ф-ии по умолчанию имеют доступ к глобальным переменным

  echo $summ().'<br />';

  function printArray($arr, $condition) {
    foreach($arr as $k => $v) {
      if($condition($k)) echo $v.' ';
    }
  }

  printArray([1, 2, 5, 7, 0], fn($index) => $index % 2 == 0);
?>