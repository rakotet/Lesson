<?php
  $str = `dir`; // вызываем команду спомошью ``
  echo iconv('CP866', 'UTF-8', $str).'<br />---------<br />'; // меняем кодировку строки

  $last_line = exec('dir'); // ф-я возвращает последнию строку переданной команды
  echo iconv('CP866', 'UTF-8', $last_line).'<br />---------<br />';

  exec('D:\lesson\Lesson\php\php30\mysite.local\lib\lesson_19_1_file.txt'); // через ф-я так же можно запускать любые внешнии файлы других программ
?>