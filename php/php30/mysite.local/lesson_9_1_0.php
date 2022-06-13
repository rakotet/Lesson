<?php
  $x = -5;

  switch(gettype($x)) {
    case 'string':
      $result = 'x - это строка';
      break;
    case 'integer':
      $result = 'x - это число';
      break;
    case 'boolean':
      $result = 'x - это булевский тип';
      break;
    default: 
    $result = 'x - это не известный тип';
  }

  echo "$result";
  echo '<br />';

  // Далее тоже самое только через оператор match
  // Главное отличие match от switch то что он сравнивает условие по значению и типу (===), а switch только по значению (==)

  $x = false;

  $result = match(gettype($x)) {
    'string' => 'x - это строка',
    'integer' => 'x - это билевский тип',
    'boolean' => 'x - это булевский тип',
    default => 'x - это не известный тип'
  };

  echo "$result";
?>