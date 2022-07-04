<?php
  $time = date('H:i:s d.m.Y', time());
  echo $time.'<br />';

  $reg = '/(\d{2})\:(\d{2})\:(\d{2}) (\d{2})\.(\d{2})\.(\d{4})/';

  echo preg_match($reg, $time, $matches);
  echo '<br />';
  echo '<pre>';
  print_r($matches);
  echo '</pre>';
  echo '<br />';

  ///////////

  $str = 'Какие то ссылки <a href="">Нажми на меня</a>, еще какие то ссылки <a href="">Тыкай 45 тут</a> давай еще ссылок <a href="mysite.local">Тык</a>  <a href="mysite.local">mysite.local</a>';
  echo $str.'<br />';

  $reg = '/\<a href\=\"[^mysite.local].*?\"?\>.+?\<\/a\>/i';
  echo preg_match_all($reg, $str, $matches);
  echo '<br />';
  echo '<pre>';
  print_r($matches);
  echo '</pre>';
  echo '<br />';

  $str2 = preg_replace($reg, '<b>Ссылки запрещены</b>', $str);
  echo $str2.'<br />';


?>

