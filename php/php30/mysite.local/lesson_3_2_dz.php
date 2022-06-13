<?php
  $a = 3;
  $b =& $a;
  $b = 5;
  echo "a = $a; b = $b;<br />";

  $c = 'a';
  echo $$c;
  echo '<br />';
?>