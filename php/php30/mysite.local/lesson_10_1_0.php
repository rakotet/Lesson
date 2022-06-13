<?php
  $arr = [3, 4, 3, 2, -7, true, 'My string'];
  foreach($arr as $value) { // цикл для перебора массивов
    echo $value.'<br />';
  }

  $arr_1 = [
    [
      'name' => 'Michael',
      'age' => 31
    ],
    [
      'name' => 'Igor',
      'age' => 35
    ],
    [
      'name' => 'Alex',
      'age' => 125
    ]
  ];

  foreach($arr_1 as $key => $value) {
    echo "$key - ";
    foreach($value as $k => $v) {
      echo "$k = $v, ";
    }
    echo '<br />';
  }

  echo '----------------<br />';

  // Заполняем массив динамически

  $arr = [];

  for($i = 0; $i < 10; $i++) {
    $arr[] = $i * 5; // такая запись добавляет элемент в конец массива (тоже самое что $arr[$i])
  }

  foreach($arr as $value) { 
    echo $value.'<br />';
  }

  echo '----------------<br />';

  foreach($arr as $key => $value) { // меняем значения элементов массива используя ключи массива
    $arr[$key] = $value * 2;
  }

  foreach($arr as $value) { 
    echo $value.'<br />';
  }

  echo '----------------<br />';

  foreach($arr as &$value) {  // спомощью жесткой ссылки меняем значение элементов массива
    $value *= 2;
  }

  foreach($arr as $value) { 
    echo $value.'<br />';
  }

  echo '----------------<br />';

  $arr = ['Ivan', 'Ivanov', 35];

  list($firsname, $surname, $age) = $arr; // ф-я записывает значения массива в переменные 
  list(, $surname, $age) = $arr; // можно пропускать элементы массива стявя , 
  echo "$firsname, $surname, $age <br />";

  echo '----------------<br />';

  $arr_1 = ['1' => 'Michael', '2' => 'Igor'];
  $arr_2 = ['3' => 'Alex', '4' => 'Homer'];

  $arr = $arr_1 + $arr_2; // массивы объеденятся т.к. у них разные индексы(ключи)

  foreach($arr as $value) { 
    echo $value.'<br />';
  }

  echo '----------------<br />';

  $arr_1 = ['1' => 'Michael', '2' => 'Igor'];
  $arr_2 = ['1' => 'Alex', '2' => 'Homer', '3' => 'Bard'];

  $arr = $arr_1 + $arr_2; // первый массив перепишет значения 2го при объединении т.к. индексы(ключи) обинаковые

  foreach($arr as $value) { 
    echo $value.'<br />';
  }

  echo '----------------<br />';
  
  $arr_1 = [1, 2, 3];
  $arr_2 = [3, 4, 5];

  foreach($arr_2 as $value) { // соединяем массивы с одинаковыми индексами, посути записываем значения второго массива в конец первого 
    $arr_1[] = $value;
  }

  foreach($arr_1 as $value) { 
    echo $value.'<br />';
  }

  echo '----------------<br />';

  $arr = ['name' => 'Oleg', 'age' => 32];
  
  echo "Элемент массива $arr[name]"; // при выводе в строке значение ассациативного массива ковычки не нужны или использовать {} для всей переменной массива
?>