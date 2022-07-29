<?php
  class User {
    public $name = 'User';
    public $email;

    public function __construct($name = false, $email = false) { // создание конструктора класса выполняется через ключевое слово __construct
      if($name) $this->name = $name; // через $this обращаемся к свойствам именно объекта
      if($email) $this->email = $email;
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

    public function __destruct() { // ф-я вызывается автоматически при удалении объекта из памяти
      echo 'Удаляем объект: '.$this->name.'<br />';
    }
  }

  $user = new User();
  print_r($user); // тут значения будут без использования конструктора класса
  echo '<br />';

  $user = new User('Oleg', '112@volgad.ru'); // создали объект класса с передачей в конструктор значений свойств объекта
  print_r($user);
  echo '<br />';

  echo $user->getName().'<br />';
  echo $user->getEmail().'<br />';

  $user->setName('Alex');
  $user->setEmail('sdd@vop.ru');

  $user_1 = new User();
  unset($user_1); // принудительно удаляем объект из памяти (так же объекты удаляются из памяти при завершении работы скрипта)

  echo $user->getName().'<br />';
  echo $user->getEmail().'<br />';

  
?>