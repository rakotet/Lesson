<?php

//магические методы надо определять самому, php обращается к ним когда идет запрос к несуществующей переменной
// все магические методы начинаются с __метод

    class Request {

        private $data;

        public function __construct() {
            $this->data = $_REQUEST; // в переменную записываем массив из все GET и POST запросов
        }

        public function __get($name) { // определили магический метод __get который принимает несуществующие переменные
            if (isset($this->data[$name])) return $this->data[$name]; // если в массиве date есть такая переменная $name возвращаем её значение, если нет то возвращаем null
            return null;
        }

        public function __set($name, $value) {// определили магический метод __set который вызывается когда мы пытаемся изменить не существующию в классе переменную
            $this->data[$name] = $value;
        }

        public function __isset($name) { // определили магический метод __isset который определяет существуел ли переменная не указанная в классе
            return isset($this->data[$name]);
        }

        public function __toString() { // определили магический метод __toString, к которому обращается php при попытке преобразовать объект в строку (который переводит объект класса в строковое значение)
            $s = '';
            foreach ($this->data as $k=>$v) $s .= "$k = $v; ";
            return $s;
        }
    }

    $request = new Request();
    echo $request->a.'<br/>'; // обращаемся к несуществующиму свойству, но ошибки нет т.к. мы определили магический метод __get который принимает такие переменные

    $request->a = 5;

    echo $request->a.'<br/>';

    echo isset($request->a).'<br/>';

    echo $request.'<br/>';

    
?>