<?php

//пример рекурсии (функция внутри себя вызывает себя же) поиск факториала
    function factorial ($n) {
        if ($n <= 1) return 1;
        return $n * factorial($n - 1);
    }

    echo factorial(3);
?>
