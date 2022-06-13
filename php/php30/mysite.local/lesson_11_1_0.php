<?php
  function hello() {
    echo 'Hello <br />';
  }

  hello();

  // Функции можно вызывать в любой части кода, даже до её объявления

  sep();

  function sep() {
    echo '<br />-------------<br />';
  }

  function helloCount($count = 5) { // параметр по умолчанию
    if(!is_int($count)) {
      echo 'Ошибка параметра, count должен быть целым числом';
      return;
    }

    for($i = 0; $i < $count; $i++) hello();
    sep();
  }

  helloCount(2);
  helloCount();

  function summa($a, $b, $return = false) {
    if($return) return ($a + $b);
    echo 'a + b = '.($a + $b).'<br />';
  }


  summa(3, 4);

  $a = summa(3, 4, true);
  echo $a.'<br />';
  sep();

  function getSumma($a, $b) {
    $summa = $a + $b;
    return $summa;
  }

  $summa = getSumma(10, 5);
  echo $summa;

  // Ссылочные параметры ф-ии

  function noChange($x) {
    $x++;
  }

  function change(&$x) { // жесткая ссылка на параметр ф-ии
    $x++;
  }

  sep();

  $a = 3;

  noChange($a);
  echo $a;
  sep();
  change($a); // переменная изменит значение т.к. было измененно значение в ячейки памяти переменной $a через жесткую ссылку с параметром ф-ии
  echo $a;
  sep();

  // Переменное количество параметров в ф-ии

  function summaN(...$numbers) { // передаём массив аргументов произвольной длины (... используется когда не известно количество аргументов)
    if(count($numbers) == 0) {
      echo 'Необходимы параметры';
      return;
    }

    $summa = 0;
    foreach($numbers as $number) {
      if(!is_numeric($number)) {
        echo 'Параметры должны быть числами';
        return;
      }

      $summa += $number;
    }

    return $summa;
  }

  echo summaN(2, 3, 4);
  sep();
  echo summaN(2, 3, 'sfs');
  sep();
  echo summaN();
  sep();

  // В php можно задавать тип принимаемых параметров ф-ии и возвращаемого значения

  function sub(int $a, int $b) : int { // php при указании типа параметров будт пытаться автоматически преобразовать агрумент к int
    return $a - $b;
  }

  echo sub(2.3, 2);
  sep();

  function test($a = 1, $b = 2, $r = false) {
    if($r) return ($a + $b);
    echo ($a + $b);
  }

  test(5, 7);
  sep();
  echo test(r: true).'<br />'; // если хотим изменить один параметр а другие оставить по умолчанию
  echo test(a: 10, r: true); // можно менять несколько
?>