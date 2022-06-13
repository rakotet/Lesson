<?php
  function factorial($n) { // находим факториал числа через рекурсию (ф-ия вызывает сама себя, нужна когда неизвестно число вложенностей)
    if($n <= 1) return 1;
    return $n * factorial($n - 1);
  }

  echo factorial(3).'<br />';

  function fibonacci($count, $arr) { // ф-я находит послшедовательность Фибоначи заданного размера
    if(count($arr) < 2 || $count < 2) return $arr;

    $n_1 = $arr[count($arr) - 2];
    $n_2 = $arr[count($arr) - 1];
    $arr[] = $n_1 + $n_2;
    if(count($arr) == $count) return $arr;
    else return fibonacci($count, $arr);
  }

  $arr = fibonacci(10, [0, 1]);
  foreach($arr as $value) echo "$value ";
?>