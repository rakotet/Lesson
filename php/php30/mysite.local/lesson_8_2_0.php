<?php
  $x = 3.4;

  if(gettype($x) == 'string') echo 'x - это строка';
  elseif(gettype($x) == 'integer') echo 'x - это число';
  elseif(gettype($x) == 'boolean') echo 'x - это билевский тип';
  else echo 'x - это не известный тип';

  echo '<br />';

  switch(gettype($x)) {
    case 'string':
      echo 'x - это строка';
      break;
    case 'integer':
      echo 'x - это число';
      break;
    case 'boolean':
      echo 'x - это билевский тип';
      break;
    default: // блок default не обязательный, так же как и else в if()
    echo 'x - это не известный тип';
  }

  echo '<br />';

  $a = 5;
  $b = 5;

  switch($a <=> $b) {
    case 0:
      echo "$a = $b";
      break;
    case 1:
      echo "$a > $b";
      break;
    case -1:
      echo "$a < $b";
  }
?>