<?php
// серилизация объектов

class User {

    public $email;
    public $password;
    public $lt;

    public function __construct($email, $password)
    {
        $this->email = $email;
        $this->password = $password;
        $this->lt = time();
    }

    public function __sleep() // переопределяем магическую функцию, вызывается перед сериализацией объекта
    {
        return ['email', 'lt']; // при сериализации объекта будут значение только этих двух полей
    }

    public  function __wakeup() // переопределяем магическую функцию, вызывается перед превращением строки в объект
    {
        $this->lt = time();
    }
}

$user = new User('abc@mail.ru', '123');
$str = serialize($user); // сериализуем объект
echo $str.'<br/>';

$fp = fopen("lib/$user->email", 'w+'); // открываем файл для записи с названием email, если файла нет - создаём его
fwrite($fp, $str); // записываем в файл результат сериализации объекта
fclose($fp); // закрываем файл

sleep(2); // скрипт ждет 2 сек

$u = unserialize($str); // обратная операция, превращаем строку в объект
print_r($u).'<br/>';


?>