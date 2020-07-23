<?php
$data = getimagesize('lib/Penguins.jpg'); // возвращает массив данных об изображении
//print_r($data);
//echo '<br/>';
$im = imagecreatefromjpeg('lib/Penguins.jpg'); // получаем дескриптор изображения для доступа к файлу

header('Content-Type: image/jpeg'); // должен идти до любого вывода т.к. передаёт заголовок
imagejpeg($im);
imagedestroy($im); // обязательно освобождаем память после вывода изображения
