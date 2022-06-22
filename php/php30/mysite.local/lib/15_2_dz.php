<?php
  function maxi($arr) {
    if(count($arr) == 0) {
      echo 'Передан пустой массив';
      return;
    }

    $max = $arr[0];

    foreach($arr as $k => $v) {
      $max = $max < $arr[$k] ? $arr[$k] : $max;
    }

    return $max;
  }

  function mini($arr) {
    if(count($arr) == 0) {
      echo 'Передан пустой массив';
      return;
    }

    $min = $arr[0];

    foreach($arr as $k => $v) {
      $min = $min > $arr[$k] ? $arr[$k] : $min;
    }

    return $min;
  }

  function summ($arr) {
    if(count($arr) == 0) {
      echo 'Передан пустой массив';
      return;
    }

    $sum = 0;

    foreach($arr as $v) {
      $sum += $v;
    }

    return $sum;
  }

  function sred($arr) {
    if(count($arr) == 0) {
      echo 'Передан пустой массив';
      return;
    }

    $sum = 0;

    foreach($arr as $v) {
      $sum += $v;
    }

    return $sum / count($arr);
  }
?>