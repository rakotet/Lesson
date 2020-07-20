<?php
// Итераторы это объекты которые позволяют себя каким либо образом перебирать

class Test
{
    public $x = 5;
    public $y = 8;
    private $z = 10;
    protected $pr = -5;
}

class MyArray implements Iterator // имплементируем интерфейс Iterator котоырй содержит в себе методы которые необходимо реализовать
{
    private $arr = ['Name' => 'Michail', 'age' => '26', 'bd' => '11.07.1990']; // создаём ассациативный массив


    public function current() // получение текущего элемента (значения)
    {
        return current($this->arr);
    }

    public function next() // получение следующей части
    {
        return next($this->arr);
    }

    public function key() // возвращает текущий ключ в объекте
    {
        return key($this->arr);
    }

    public function valid() // возвращает true если достигли конца итератора
    {
        $key = key($this->arr);
        return ($key !== null && $key !== false);
    }

    public function rewind() // сбрасывает итератор (обнуляет)
    {
        reset($this->arr);
    }
}

$test = new Test();
foreach ($test as $k => $v) echo "$k = $v; "; // перебираем объект
echo '<br/>';

$arr = new MyArray();

foreach ($arr as $k => $v) echo "$k = $v; "; // перебираем объект
echo '<br/>';

$dir = new DirectoryIterator('C:\зп'); // встроенные в php итератор, перебирает файлы в указанной директории
foreach ($dir as $file) {
    echo $file->getFilename(); // получаем имя файла
    if ($file->isFile()) echo ' - '.$file->getSize().' Байт'; // проверяем, если является файлом то выводим его размер
    echo '<br/>';
}

