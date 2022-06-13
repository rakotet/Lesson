<?php
  function getSumm($array = 0) {
    if(gettype($array) != 'array') return false;
    elseif (count($array) == 0) return false;
    else {
      $summ = 0;
      foreach($array as $v) {
        if(is_numeric($v)) {
          $summ += $v;
        } else return false;
      }

      return $summ;
    }
  }

  function fact($number) {
    if(!is_numeric($number)) {
      echo 'Некоректное число';
      return;
    }

    $s = 1;

    for($i = 2; $i <= $number; $i++) {
      $s *= $i;
    }

    return $s;
  }

  echo fact(4).'<br />';

  $arr_1 = [];
  $arr_2 = [1, 'fdf'];
  $arr_3 = [1, 4];

  $s = $_GET['s'] ?? false;

  if($s == 1) {
    if(getSumm($arr_1) == false) echo 'Некорректный массив';
    else echo 'Сумма элементов массива равна '.getSumm($arr_1);
  } 
  elseif($s == 2) {
    if(getSumm($arr_2) == false) echo 'Некорректный массив';
    else echo 'Сумма элементов массива равна '.getSumm($arr_2);
  }
  elseif($s == 3) {
    if(getSumm($arr_3) == false) echo 'Некорректный массив';
    else echo 'Сумма элементов массива равна '.getSumm($arr_3);
  }
?>

<div>
  <a href="?s=1">1</a>
  <a href="?s=2">2</a>
  <a href="?s=3">3</a>
</div>