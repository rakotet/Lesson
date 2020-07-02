<?php
    $arr = ['Michael', 'Russakov', 26];

    $firstname = $arr [0];
    $surname = $arr [1];
    $age = $arr [2];

    echo "$firstname, $surname, $age";

    echo '<br/>';

    //делаем тоже самое но правильно

    list ($firstname, $surname, $age) = $arr; //записывает значение элементов массива в переменные

    echo "$firstname, $surname, $age";

    echo '<br/>';

    list ($firstname, , $age) = $arr; //записывает 1 и 3 значение в переменные

    echo "$firstname, $age";

    echo '<br/>';

    //слияние массивов (сложение)

    $arr_1 = ['name_1' => 'Michael', 'name_2' => 'Igor'];
    $arr_2 = ['name_3' => 'Alex', 'name_4' => 'Homer'];

    $arr = $arr_1 + $arr_2;

    foreach ($arr as $value) echo $value.'<br/>';

    echo '<br/>';

    $arr_1 = ['name_1' => 'Michael', 'name_2' => 'Igor'];
    $arr_2 = ['name_1' => 'Alex', 'name_2' => 'Homer'];

    $arr = $arr_1 + $arr_2; //если ключи разных массивов совпадают, то останутся значения которые идут первыми 

    foreach ($arr as $value) echo $value.'<br/>';

    echo '<br/>';

    echo "Элемент равен {$arr_1 ['name_1']}"; // выводи элемент массива сразу в строке используя {}

    echo '<br/>';

    
?>
