<?php
    // Ананимная функция - функция без имени, записывается в переменную, либо передаем в параметр другой функции

    $hello = function ($string)
    {
        echo "$string<br/>";
    };

    $hello('Hello World');

    echo '<br/>';

    function test ($a, $func) {
        $arr = [];
        for ($i = 0; $i < $a; $i++) {
            $arr [] = $func($i);
        }
        return $arr;
    }

    $arr = test(10, function($i) {
        return $i * $i;
    });

    foreach($arr as $v) echo $v.', ';

    echo '<br/>';


?>
