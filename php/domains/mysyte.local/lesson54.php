<?php
// класс ERROR отвечает за математические и синтактические ошибки

try {
    $x = 5 % 0; // ошибка остатка от деления на 0
} catch (Error $e) {
    echo $e;
}
echo '<br/>';
try {
    $str = 'Hello';
    $str[] = 2; // ошибка типов
} catch (Error $e) {
    echo $e;
}
echo '<br/>';
try {
    intdiv(PHP_INT_MIN, -1); // ошибка допустимого числового диапозона в php
} catch (Error $e) {
    echo $e;
}
echo '<br/>';
try {
    eval('5 + '); // функция выполняет любой php код в параметре (НИ КОГДА НЕ ИСПОЛЬЗОВАТЬ ТАКУЮ ФУНКЦИЮ)
} catch (Error $e) {
    echo $e;
}
