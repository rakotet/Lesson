<?php
    function summa($x, $y) {
        if ($x !== false && $y !== false && is_numeric($x) && is_numeric($y)) return $x + $y; //если $x и $y не false и являются числа тогда считаем сумму
        return false; // если пареметры не подходят возвращаем false
    }
?>