<?php
  $url = 'http://myrusakov.ru/abc.html?a=12&ab=abc&xyz=12+24';
  echo $url.'<br />';

  $arr = parse_url($url); // ф-я возвращает массив разбив на клчюевые элементы переданный url
  print_r($arr);
  echo '<br />';

  
?>