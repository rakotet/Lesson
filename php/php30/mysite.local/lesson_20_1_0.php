<?php
  if(!file_exists('lib/new derectory')) { // ф-я проверяет существует ли указанная директория (папка)
    mkdir('lib/new derectory'); // ф-я создаёт папку по указанному пути если нет такой папки
    rmdir('lib/new derectory'); // ф-я удаляет только пустую папку по указанному пути
  }
  
  $arr = glob('lib/*.php'); // ф-я возвращает массив всех файлов по указанному шаблону
  print_r($arr);
  echo '<br />-------------<br />';

  echo 'Дерево директории:<br />';

  $count_lines = 0;

  function printDir($folder, $space = '') { // ф-я будет как бы "распечатывать" директорию со всеми файлами и папками
    global $count_lines;

    $files = scandir($folder); // ф-я возвращает массив со всеми файлами и папками по указанному пути
    foreach($files as $file) {
      if($file == '.' || $file == '..') continue;
      $f = $folder.DIRECTORY_SEPARATOR.$file; // путь к каждому файлу и папке
      echo $space.$f.'<br />';
      if(is_dir($f)) printDir($f, '&nbsp;&nbsp;'); // если директория то спомошью рекурсии запускаем ф-ю в этой директории (&nbsp; - это html сущность пробела, что бы они сохранялись)
      else $count_lines += getCountsLines($f); // считаем количество строк во всех файлах и папках директории
    }
  }

  function getCountsLines($file) {
    $array = explode("\n", file_get_contents($file)); // ф-я разбивает файл на массив по переданному разделителю 1 арг, 2 арг получаем содержимое файла
    return count($array); // количество элементов этого массива и есть количество строк в файле
  }

  printDir('.'); // '.' - это путь к текущей директории

  echo 'Общее колличество строк кода: '.$count_lines;
?>