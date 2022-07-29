<?php
  // Модификаторы доступа нужно ставить перед полями и методами класса

  class User {
    public $id = 0; // модификатор public означает что доступ к этому свойству есть откуда угодно
    protected $name = 'User'; // модификатор protected означет что доступ к этому свойству есть у этого и дочерних классов (наследники) за предела класса вызвать нельзя
    private $email; //модификатор private означает что доступ к этому свойству есть только в пределах (внутри) этого класса, за предела класса вызвать нельзя

    public function __construct($name = false, $email = false) { 
      if($name) $this->name = $name; 
      if($email) $this->email = $email;
      $this->id = $this->getId();
    }

    private function getId() {
      return uniqid();
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

    public function __destruct() { 
      echo 'Удаляем объект: '.$this->name.'<br />';
    }
  }

  $user = new User();
  echo $user->id.'<br />';
  //echo $user->name.'<br />'; // будет фатальная ошибка т.к. пытаемся вызвать свойство с модификатором protected

  echo $user->getName().'<br />'; // к защищенным свойствам класса можно обращатсья через метоты этого класса, которые используют эти переменные внутри класса

  
?>