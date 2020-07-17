<?php
    class User {

        public $name = 'User';
        public $email;

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


?>