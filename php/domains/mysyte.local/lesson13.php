<?php
    $arr = array(1, 5, -1, 0, 5); //старая запись массива
    $arr = [1, 5, -1, 0, 5, true, "My string"]; //более новая запись массива, в массиве могут быть любые типы значений в php

    echo $arr[3]; // выводим 4 элемент 0 это элемент с индексом 3 т.к нумерация в массиве начинается с 0

    echo '<br/>';

    for ($i = 0; $i < count($arr); $i++) { // count возвращает длину массива
        echo $arr[$i].'<br/>';
    }

    $arr_2 = ["name" => "Michael", "age" => 26]; //ассациативный массив имеет ключ (name, age) -> значение (Michael, 26). 
    echo $arr_2 ['name']; // по ключу получаем значение 

    echo "<br/>";

    $arr_3 = [[1, 2], [3, 5, 7]]; // двумерный массив (массив из массивов)
    echo $arr_3 [0] [1]; // что бы получить 2 сначала обращаемся к индексу верхнего массива, затем к нужному индексу внутреннего массива 

    echo '<br/>';
    echo '<br/>';

    //как перебрать многомерный массив
    for ($i = 0; $i < count($arr_3); $i++) {
        for ($j = 0; $j < count($arr_3 [$i]); $j++)
            echo $arr_3 [$i] [$j].'<br/>';
    }

    echo '<br/>';

    //многомерный ассациативный массив

    $staff = [
        [
            'name' => 'Michail',
            'age' => 26
        ],
        [
            'name' => 'Igor',
            'age' => 21
        ],
        [
            'name' => 'Alex',
            'age' => 20
        ]
    ];

    echo $staff [1] ['age']; // что бы получить 21 сначала обращаемся к индексу верхнего массива, затем к нужному индексу внутреннего массива

    echo '<br/>';


?>
