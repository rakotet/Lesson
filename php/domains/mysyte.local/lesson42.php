<?php
    //статические свойства(переменные) и функции(методы) принадлежат не объектам класса а самому классу (не меняются в разных объектах класса)

    class Math {

        public const PI = 3.1415926; // создаём публичную константу (имеет схожие свойства со статическими переменными)
        private static $counter = 0; // создаём статическую переменную (свойство класса)

        public static function sin($x) { // создаем статическую функцию (нахождения синуса числа)
            Math::$counter++; // обращаемся к статической переменной
            return sin($x);
        }

        public static function pi2() {
            Math::$counter++;
            return Math::PI ** 2; // обращение к константам идет так же как и к статическим методам
        }

        public static function getCounter() {
            return Math::$counter;
        }
    }

    echo Math::sin(5).'<br/>'; // вызов статического метода происходит через класс::метод
    echo Math::pi2().'<br/>';
    echo Math::getCounter().'<br/>';

?>