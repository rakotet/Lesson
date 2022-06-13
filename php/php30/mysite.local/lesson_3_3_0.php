<?php
  define('COLOR', '#a0a'); // создаём константу, первый аргумент имя, второй значение
  echo COLOR; // выводим константу
  echo '<br />';
  echo defined('COLOR'); // ф-я возвращает true если константа существует
  echo '<br />';

  // Встроенные константы в PHP

  echo __FILE__; // содержит путь к данному файлу 
  echo '<br />';
  echo PHP_VERSION;
  echo '<br />';
  echo DIRECTORY_SEPARATOR; // содержит разделитель файловой системы где находится скрипт
  echo '<br />';

  define('FONT_SIZE', '24px');

?>

<p style="color: <?= COLOR ?>; font-size: <?= FONT_SIZE ?>;">Привет мир!</p>