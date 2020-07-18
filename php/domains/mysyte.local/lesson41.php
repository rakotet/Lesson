<?php

//public - открытый модификатор доступа, к полю или методу класса все имеют доступ откуда угодно
//protected - закрытый модификатор доступа, к полю или методу класса есть доступ только внутри самого класса или из класса наследника (дочернего класса) 
//private - закрытый модификатор доступа, к полю или методу класса есть доступ только внутри самого класса

// Стараются делать как можно больше закрытых полей и методов, делая для полей геттеры и сетторы

    class User {

        public $name = 'User';
        public $email;

        private $name_1 = 'User';
        private $email_1;

        public function __construct($name, $email) { // создаём конструктор класса, конструктор это начальное состояние объекта
            $this->name = $name; // присваиваем значение переменной $name полю класса $name
            $this->email = $email;
        }

        public function getName() {
            return $this->name;
        }

        public function getEmail() {
            return $this->email;
        }

        public function setName($name) {
            $this->name = $name;
        }

        public function setEmail($email) {
            $this->email = $email;
        }


        // деструкторы

        public function __destruct() { // срабатывает когда php удалил объект user после завершения скрипта, что бы освободить память, так же вызовится если вручную удалить объект или назначить ему другое значение
            echo 'Удаляем объект';
        }
    }

    $user = new User('Igor', 'abc@abc.ru'); // создаем объект следую параметрам конструктора

    echo $user->name.'<br/>';
    echo $user->email.'<br/>';

    echo $user->getName().'<br/>';
    echo $user->getEmail().'<br/>';

    $user->setName('Michail');
    $user->setEmail('asd@mail.ru');

    echo $user->getName().'<br/>';
    echo $user->getEmail().'<br/>';

    //echo $user->name_1.'<br/>'; будет ошибка т.к name_1 private и к полю нету доступа из все класса


?>