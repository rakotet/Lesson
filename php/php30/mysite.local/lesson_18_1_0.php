<?php
  $a = [4, 3, 2, 1, 4, 5, 9 ,0 ,1 ,4];

  print_r($a);

  echo '<br />';

  echo is_array($a).'<br />'; // возвращает true если передан массив, false если не массив

  $a = array_unique($a); // возвращает массив только с уникальными элементами

  print_r($a);

  echo '<br />---------<br />';

  shuffle($a); // ф-я перемешивает массив в случайном порядке
  print_r($a);

  echo '<br />';

  print_r(array_reverse($a)); // ф-я переворачивает массив
  echo '<br />';

  print_r(array_flip($a)); // ф-я меняет местами ключи и значения в массиве
  echo '<br />';

  $a = ['name' => 'Alex', 'age' => 31];

  print_r(array_values($a)); // ф-я возвращает обычный массив из одних значений
  echo '<br />';

  print_r(array_keys($a)); // ф-я возвращает обычный массив из одних ключей ассациативного массива
  echo '<br />';

  echo '<br />---------<br />';

  $list_1 = [1, 2, 3];
  $list_2 = [4, 5, 6];

  $all = array_merge($list_1, $list_2); // объеденяет массивы и возвращает объедененный массив (можно передавать любое количество аргументов)

  print_r($all);
  
  echo '<br />---------<br />';

  $list = range(1, 10); // возвращает массив значений из заданого в аргументах диапазона
  print_r($list);
  echo '<br />';

  $list = array_slice($list, 2, 6); // отрезает и возвращает массив с заданного индекса (2 арг) по заданный индекс (3 арг)
  print_r($list);
  echo '<br />';

  shuffle($list);
  print_r($list);
  echo '<br />---------<br />';

  sort($list); // ф-я сортирует массив по возрастанию значений, не сохраняет изначальные индексы массива
  print_r($list);
  echo '<br />';

  rsort($list); // ф-я сортирует массив по убыванию значений, не сохраняет изначальные индексы массива
  print_r($list);
  echo '<br />---------<br />';

  $arr = ['1' => 5, '2' => 0, '4' => 10, 'name' => 12];

  asort($arr); // сортирует массив по возрастанию значений сохраняя ключи(индексы) массива
  print_r($arr);
  echo '<br />';

  arsort($arr); // сортирует массив по убыванию значений сохраняя ключи(индексы) массива
  print_r($arr);
  echo '<br />';

  ksort($arr); // сортирует ключи массива по возрастанию
  print_r($arr);
  echo '<br />';

  krsort($arr); // сортирует ключи массива по убыванию
  print_r($arr);
  echo '<br />';

  $arr = [-30, 40, -25, 20, 12, 15, -50, 40, 0];

  function mySort($a, $b) { // сортируем по возрастанию не учитывая знак тоеть по модулю числа
    return abs($a) <=> abs($b);
  }

  uasort($arr, 'mySort'); // сортирует массив через переданную ф-ю во втором аргументе, у этой ф-и всегда должно быть два аргумента
  print_r($arr);
  echo '<br />';

  $clients = [
    [
      'firstname' => 'Alex', 'surname' => 'Ivanov'
    ], 
    [
      'firstname' => 'Ivan', 'surname' => 'Smirnov'
    ],
    [
      'firstname' => 'Petr', 'surname' => 'Petrov'
    ]
  ];

  print_r($clients);
  echo '<br />';

  function mySortForClients($client_1, $client_2) { // сортируем по фамилии по алфавиту
    return $client_1['surname'] <=> $client_2['surname'];
  }

  uasort($clients, 'mySortForClients');
  print_r($clients);
  echo '<br />';
?>