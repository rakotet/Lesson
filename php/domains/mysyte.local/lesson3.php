<?php
//регистр переменных в php имеет роль, а и А разые переменные
    $a = 5;
    $b = 7;
    echo isset($a); //isset проверяет существует ли переменная, возвращает true или false
    echo "<br />";
    echo isset($A); //false
    echo "<br />";

    $x = 15;
    echo gettype($x); //оптеделяет тип переменной
    echo "<br />";
    $x = (double) $x; //преобразуем переменную из int в double
    echo gettype($x);
    echo "<br />";

    $str = "Hello";
    echo "Переменная str - это String? : ";
    echo is_string($str); //проверяем является ли переменная string
    echo "<br />";

    echo ((int) $str); //при приобразовании строки в число всегда получается 0
    echo "<br />";

    $str_number = "12345";
    echo ((int) $str_number); //преобразуем строку из чисел в число, так работает
    echo "<br />";
    
    echo is_numeric($str_number); //определяет состоит ли переменная из чисел, возвращает true или false
    echo "<br />";

    echo isset($x);
    echo "<br />";
    unset($x); //удаляем переменную из пямяти (удаляем ссылку)
    echo isset($x);
?>