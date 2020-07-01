<?php
    $x = '2';
    switch (gettype($x)) {
        case "string":
            echo "x - это строка";
            break;
        case "integer":
            echo "x - это целое число";
            break;
        case "boolean":
            echo "x - это boolean";
            break;
        default:
            echo "x - не известный тип"; // выполняется если не один из case не сработал
    }

    echo "<br/>";

    $a = 1;
    $b = 2;

    switch ($a <=> $b) { //такой оператор называется "космический корабль", возвращает три возможных варианта $a == $b вернет 0, $a < $b вернет -1, $a > $b вернет 1
        case 0 :
            echo '$a = $b';
        break;
        case 1 :
            echo '$a > $b';
        break;
        case -1 :
            echo '$a < $b';
        break;
    }

    echo "<br/>";

    //другой возможный синтаксис switch

    $x = '2';
    switch (gettype($x)) :
        case "string":
            echo "x - это строка";
            break;
        case "integer":
            echo "x - это целое число";
            break;
        case "boolean":
            echo "x - это boolean";
            break;
        default:
            echo "x - не известный тип"; // выполняется если не один из case не сработал
        endswitch;
?>
