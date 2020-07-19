<?php

//Автоматическая подгрузка классов нужна что бы не подключать в ручную сотни классов в больших проектах
// так же занимает меньше памяти в php

//require_once 'lib/user_class.php'; // подключаем вручную каждый файд
//require_once 'lib/point_class.php';

/*function __autoload($classname) { //магическая фу-я, вызывается при вызове класса из другого файла, подключаем все файлы php в папке lib (файлы должны называться в соответствии с классом внутри)
    require_once "lib/{$classname}_class.php";
}*/

//далее еще способ подключения большого количества файлов php (лучший способ)

set_include_path(get_include_path() . PATH_SEPARATOR . 'lib/core' . PATH_SEPARATOR . 'lib'); // через сепаратор подключаем все необходимые папки с файлами php
spl_autoload_extensions('_class.php'); // указываем расширение искомых файлов в указанных выше директориях
spl_autoload_register(); //подключаем все найденные файлы

$user = new User();
echo $user->name . '<br/>';
$point = new Point();
echo $point->x . '<br/>';
$circle = new Circle();
echo $circle->t . '<br/>';


