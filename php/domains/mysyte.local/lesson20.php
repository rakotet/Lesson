<?php

/**Как я понял, генератор это функция в которой вместо retern используется yield, т.к. она возвращает не только 
 * значения но и функции и ключи со значениями. Еще генераторы экономят ресурсы сервера. Генераторы используются вместо огромных массивов */ 

    function gener1() {
        echo '1';
        yield 1; // yield возвращает в итератор
        echo '2';
        yield 2;
        echo '3';
        yield 3;
    }

    foreach(gener1() as $value) {
        echo "- из цыкла $value<br/>";
    }

    echo '<br/>';

    function gener2($from, $to) {
        for ($i = $from; $i < $to; $i++) {
            echo "$i - ";
            yield $i;
        }
    }

    foreach (gener2(1, 10) as $value) {
        echo "Удвоим: ".($value * 2).'<br/>';
    }

    echo '<br/>';

    function doubleArray ($arr, $callback) {
        foreach ($arr as $v) yield $callback($v); // можно возвращать не только значения но и функции
    }

    $arr = [1, 2, 3, 4, 5, 6];
    $gener = doubleArray($arr, function($v) {return $v * 2;});

    /**$gener - это Не массив, а объект!!!! */

    foreach ($gener as $v) echo "$v - ";

    echo '<br/>';
    echo '<br/>';

    $arr = ['Michael' => 27, 'Igor' => 20];

    function gener3($arr, $callback) {
        foreach($arr as $key => $v) {
            yield $key => $callback($v);
        }
    }

    $gener = gener3($arr, function($age){return ($age < 23) ? 'student' : 'worker';}); /**$gener - это Не массив, а объект!!!! */

    foreach($gener as $key => $value) echo "$key - $value<br/>";

    echo '<br/>';

    $count = 100000;
    $arr = [];

    for($i = 0; $i < $count; $i++) $arr[] = $i; //создаём массив из 100000 элементов

    $s = 0;
    foreach($arr as $v) $s += $v; // сщитаем сумму элементво массива
    echo "Сумма: $s<br/>";

    echo memory_get_usage().'<br/>'; // встроенный в php метод показывающий сколько используем этим скриптом оперативной памяти сервера в байтах

    unset($arr); //удаляем массив $arr из оперативной памяти

    echo memory_get_usage().'<br/>';

    //далее создадим функцию которая считает сумму элементов большого массива без создания самого массива (для экономии памяти сервера)

    function ememory ($count) {
        for($i = 0; $i < $count; $i++) yield $i; // проталкиваем значения в итератор
    }

    $s = 0;

    foreach(ememory($count) as $v) $s += $v;

    echo "Результат суммы элементов массива из 100000 элементов с 1 до 100000: $s<br/>";

    echo memory_get_usage().'<br/>';
?>
