<?php
$dir = dir('C:\зп'); // получаем доступ к классу Directory через объект
print_r($dir); // выводит пути к директории и дескриптор перебора директории
echo '<br/>';
while (($file = $dir->read()) !== false) { // перебираем директорию, выводим имя файлов и папок
    echo $file.'<br/>';
}
$dir->rewind();// сбрасываем внутренний указатель в $file на начало, для того что бы можно было еще раз начать перебор с начала
$dir->close(); // закрываем доступ к директории

