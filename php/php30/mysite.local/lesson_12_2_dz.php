<?php
  $x = 5;

  function umn($number) {
    echo $number * 10;
  }

  umn($x);

  echo '<br />';

  function stepen($a, $b) {
    if($a == 0 || $b == 0) return 1;

    return $a * stepen($a, $b - 1);
  }

  echo stepen(3, 3);
?>