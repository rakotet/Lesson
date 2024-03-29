<?php
  // Регулярные выражения это строка шаблон в начале и конце которой есть одинаковый символ (/)
  // Модификаторы рег. выражений можно комбинировать сколько угодно в одном выражении

  $reg = '/a M/'; // простейшее регулярное выражение на соответствие
  $str = '1a M 33';

  echo preg_match($reg, $str, $matches),'<br />'; // ф-я возвращает 1 если рег.выражение (1 арг) соответствует строке (2 арг), если несоответствует то возвращает 0, совпадения записываются в массив (3 арг)
  print_r($matches);
  echo '<br />';

  $reg = '/a \d b/'; // \d - на этом месте ожидается любая цифра от 0 до 9
  $str = '11111a 5 baaaaaa';
  echo preg_match($reg, $str),'<br />';

  $reg = '/a \D b/'; // \D - на этом месте ожидается любой символ кроме цифры и кирилицы
  $str = '11111a f baaaaaa';
  echo preg_match($reg, $str),'<br />';

  $reg = '/a \w b/'; // \w - на этом месте ожидается любой алфовитно цифровой символ (кирилица не всчет)
  $str = '11111a h baaaaaa';
  echo preg_match($reg, $str),'<br />';

  $reg = '/a \W b/'; // \W - на этом месте ожидается любой не алфовитно цифровой символ (кирилица не всчет)
  $str = '11111a ! baaaaaa';
  echo preg_match($reg, $str),'<br />';

  $reg = '/a \s b/'; // \s - на этом месте ожидается пробельный символ (сам пробел, знак табуляции \t, переход на новую строку \n)
  $str = "11111a \t baaaaaa";
  echo preg_match($reg, $str),'<br />';

  $reg = '/a \S b/'; // \S - на этом месте ожидается любой не пробельный символ (кирилица не всчет)
  $str = '11111a . baaaaaa';
  echo preg_match($reg, $str),'<br />';

  $reg = '/a \n b/'; // \n - на этом месте ожидается знак перехода на новую строку
  $str = "11111a \n baaaaaa";
  echo preg_match($reg, $str),'<br />';

  $reg = '/a \N b/'; // \N - на этом месте ожидается не знак перехода на новую строку
  $str = '11111a 6 baaaaaa';
  echo preg_match($reg, $str),'<br />';
?>