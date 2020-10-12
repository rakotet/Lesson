<?php
 $stock = $_GET['stock'];
 if ($stock == 'XYZ') {
     $base= 5;
     $rand = mt_rand() / mt_getrandmax(); // генерируем случайное число
     $course = round($base + $rand, 2); // округляем до двух знаков после запятой
     echo $course;
 }
 else echo -1;
