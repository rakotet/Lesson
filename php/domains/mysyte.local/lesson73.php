<?php
$im = imagecreatetruecolor(500, 500); // создаём холст

$text = 'Hello World!'; // русские символы нужно выводить через юникод сущности
$font = 'D:\Lesson\php\domains\mysyte.local\lib\pala.ttf';
imagettftext($im, 12, 50, 100, 100, imagecolorallocate($im, 255, 255, 0), $font, $text); // подключаем шришты, 1 холст, 2 размер шрифта, наклон шрифта, координаты X и Y, цвет, путь к шрифту, текст

$text = 'Русский текст'; // что бы вывелся корректно сначала нужно его преобразовать в юникод с помощью htmlentities
imagettftext($im, 12, 50, 100, 300, imagecolorallocate($im, 255, 255, 0), $font, htmlentities($text));

header('Content-Type: image/png');
imagepng($im);
imagedestroy($im);