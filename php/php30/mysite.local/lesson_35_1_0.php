<?php
  $url = 'http://myrusakov.ru/abc.html?a=12&ab=abc&xyz=12+24';
  echo $url.'<br />';

  $arr = parse_url($url); // ф-я возвращает массив разбив на клчюевые элементы переданный url
  print_r($arr);
  echo '<br />';

  parse_str($arr['query'], $qyery); // ф-я парсит перданные GET параметры в строке и возвращает массив
  print_r($qyery);
  echo '<br />';

  $qyery['a'] = 10; // изменяем, удаляем GET параметры так как нам надо
  unset($qyery['ab']);
  print_r($qyery);
  echo '<br />';

  $qyery = http_build_query($qyery); // ф-я из масива с GET параметрами делает обратно строку с GET параметрами учитывая все нюансы запросов и спецсимволов в строке
  echo $qyery.'<br />';

  $url = $arr['scheme'].'://'.$arr['host'].$arr['path'].'?'.$qyery; // собираем обратно url с уже измененными GET параметрами
  echo $url;
?>