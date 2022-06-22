<?php
  $arr = [1, 3, 8, -4, 0];

  echo $arr[mt_rand(0, count($arr) - 1)].'<br />';

  shuffle($arr);
  echo $arr[0].'<br />';

  /////////////////////

  $people = [
    [
      'name' => 'Alex',
      'age' => 31
    ],
    [
      'name' => 'Igor',
      'age' => 20
    ],
    [
      'name' => 'Pavel',
      'age' => 18
    ]
  ];

  function sortAge($a, $b) {
    return $b['age'] <=> $a['age'];
  }

  uasort($people, 'sortAge');
  print_r($people);
  echo '<br />';

  //////////////////////////

  $start = microtime(true);

  for($i = 0; $i < 10**7; $i++);

  echo 'Время выполнение скрипта: '.(microtime(true) - $start).'<br />';

  /////////////////////

  $time = time() + (mt_rand(1, 10) * 1000);

  echo 'Текущее время: '.date('d.m.Y H:i:s').'<br />';
  echo 'Конечное время: '.date('d.m.Y H:i:s', $time).'<br />';

  echo 'Время до: '.date('H:i:s', ($time - time())).'<br />';

  echo 'До моего др осталось: '.round((mktime(16, 0, 0, 11, 3, 2022) - time()) / (3600 * 24));
?>