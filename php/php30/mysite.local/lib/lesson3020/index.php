<?php
  // Старый способ подключения других файлов
  // Подходит когда классов немного, но если классов которые нужно подключить сотни то нужно использовать автозагрузку классов.

  // require_once 'core/User.php';
  // require_once 'lib2/Circle.php';
  // require_once 'lib2/Point.php';

  set_include_path(get_include_path().PATH_SEPARATOR.'core'.PATH_SEPARATOR.'lib2'); // настраиваем автозагрузку файлов указывая путь к нужным папкам относительно текущего файла
  spl_autoload_register(); // подключаем автозагрузку, всё, теперь можно работать со всеми файлами в указанных папках через пространство имен если оно есть у них

  use \core\User, \lib2\Circle, \lib2\Point; // подключаем нужные классы через пространство имен

  $user = new User();
  print_r($user);
  echo '<br />';

  $circle = new Circle();
  print_r($circle);
  echo '<br />';

  $point = new Point();
  print_r($point);
  echo '<br />';
?>