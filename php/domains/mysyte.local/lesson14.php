<?php
    $arr = [1, 5, 0, true, false, 'MyString', 2.5];

    foreach ($arr as $value) {//первое значение где перебераем, второе чем перебираем (записываем в переменную $value по очереди каждый элемент массива с каждой новой итерацией цикла)
        echo $value.'<br/>';
    }

    $arr_1 = [
        [
            'name' => 'Michael',
            'age' => 26
        ],
        [
            'name' => 'Igor',
            'age' => 18
        ],
        [
            'name' => 'Alex',
            'age' => 31
        ]
    ];

    foreach ($arr_1 as $value) {
        foreach ($value as $v) { // выводим значение ассациативного массива (через 2 foreach)
            echo $v.' - ';
        }
        echo '<br/>';
    }

    echo '<br/>';

    foreach ($arr_1 as $key => $value) {
        echo $key.' - '; //выводим индексы внутренних массивов
        foreach ($value as $k => $v) { // выводим ключи и значения ассациативного массива (через 2 foreach)
            echo "$k = $v, ";
        }
        echo '<br/>';
    }

    $arr = [];

    for ($i = 0; $i < 100; $i++) {
        $arr [] = $i * 5; //заполняем массив 
    }

    foreach ($arr as $value) {
        echo $value.','; // выводим содержимое массива
    }

    echo '<br/>';

    foreach ($arr as $key => $value) {
        $arr [$key] = $value * 2; //меняем каждый элемент массива
    }

    foreach ($arr as $value) {
        echo $value.','; // выводим содержимое массива
    }

    echo '<br/>';

    //делаем тоже самое но используем "жесткие ссылки"

    foreach ($arr as &$value) {// & жестко связывает $value с значение элемента массива
        $value * 2; //меняем каждый элемент массива
    }

    foreach ($arr as $value) {
        echo $value.','; // выводим содержимое массива
    }
?>
