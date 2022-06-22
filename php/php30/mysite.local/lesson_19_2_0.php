<?php
  $arr = parse_ini_file('lib/lesson_19_2_0.ini', true); // ф-я возвращает многомерный массив с парсингом ini файла

  echo '<pre>';
  print_r($arr);
  echo '</pre>';

  echo '<br />';

  echo $arr['Config']['site']; // выводим одно из значений
  echo '<br />';

  $arr = parse_ini_file('lib/lesson_19_2_0.ini', true, INI_SCANNER_TYPED); // с таким третьим параметром все значения в возвращенном массиве будут пытаться сохранить свой изначальный тип, а не просто переведенны в строки

  echo '<pre>';
  print_r($arr);
  echo '</pre>';

  echo '<br />';

  echo $arr['Test']['a'];
  echo '<br />';
  echo gettype($arr['Test']['a']);
?>