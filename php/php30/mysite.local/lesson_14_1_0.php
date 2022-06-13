<?php
  // Генераторы это специальные ф-ии которые могут вернуть много значений и помнят где завершили свою работу
  // Служат для экономии памяти при переборе огромных массивов
  // Генераторы не массивы а объекты

  function generator1() {
    echo 1;
    yield 'a'; // возвращает значение, при этом при следующем запуске этой ф-ии выполнение начнется именно с этой строки с ключевого слова yield
    echo 2;
    yield 'b';
    echo 3;
    yield 'c';
  }

  foreach(generator1() as $value) { // генератр не вызывается без цикла
    echo " - $value <br />";
  }

  function generator2($from, $to) {
    for($i = $from; $i < $to; $i++) {
      echo "$i - ";
      yield $i;
    }
  }

  foreach(generator2(1, 10) as $value) {
    echo 'Возведём в квадрат: '.($value ** 2).'<br />';
  }

  function getGenerator($arr, $callback) {
    foreach($arr as $v) yield $callback($v);
  }

  $arr = [1, 2, 3, 4, 5, 6];

  $generator = getGenerator($arr, function($x) { // результат генераторов можно выводить не только через цикл, но и записывать в переменную
    return $x * 2;
  });

  foreach($generator as $v) echo "$v, ";

  echo '<br />';

  // Тот же генератор через стрелочную ф-ю

  $generator = getGenerator($arr, fn($x) => $x * 2);

  foreach($generator as $v) echo "$v, ";

  echo '<br />';

  // Генераторы могут использовать как бы ключ значение при возврате

  function generator3($arr, $callback) {
    foreach($arr as $k => $v) {
      yield $k => $callback($v);
    }
  }

  $arr = ['Igor' => 35, 'Alex' => 18];

  $generator = generator3($arr, function($age) {
    return $age < 23 ? 'Student' : 'Worker';
  });

  foreach($generator as $key => $value) {
    echo "$key - $value <br />";
  }

  // Генераторы это отличная возможность съэкономить память

  $count = 1000000;
  $arr = [];

  for($i = 0; $i < $count; $i++) $arr[] = $i;
  $s = 0;
  foreach($arr as $v) $s += $v;
  echo "Result: $s <br />";

  echo memory_get_usage().'<br />'; // ф-я показывает сколько в оперативной памяти занимает наш скрипт при выполнении

  unset($arr); // удаляем массив из оперативной памяти

  echo memory_get_usage().'<br />';

  // Реализуем эту же задачу используя генератор и посмотрим сколько это съэкономип оперативной памяти

  function generator4($count) {
    for($i = 0; $i < $count; $i++) yield $i;
  }

  $s = 0;

  foreach(generator4($count) as $v) $s += $v;
  echo "Result: $s <br />";
  echo memory_get_usage().'<br />';
?>