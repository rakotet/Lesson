<?php
  $x = 2;
  $y = 1.5;
  echo 'x + y = '.$x + $y.'; x - y = '.$x - $y.'; x * y = '.$x * $y.'; x / y = '.$x / $y.';<br />';
  echo pow($x, 1/3);
  echo '<br />';
  $x++;
  echo $x.'<br />';
  $x--;
  $x--;
  echo $x.'<br />';
  $x = 2;
  $y = 1.5;
  echo '(a + b * a – b + 15 / a) = '.($x + $y * $x - $y + 15 / $x).'<br />';

?>