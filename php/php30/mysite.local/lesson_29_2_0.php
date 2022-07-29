<?php
  // Анонимные классы это самые обычные классы но без имени.
  // После создания анонимного класса ставится ;
  // Используется в ситуациях когда нужен один объект для каких либо действий с ним в одном месте без создания других экземпляров этого класса

  $user = new class { // так создаётся анонимный класс и в $user сразу помещается экземпляр этого класса

    private string $email;

    public function setEmail(string $email) {
      $this->email = $email;
    }

    public function getEmail() : string {
      return $this->email;
    }
  };

  $user->setEmail('asd@mail.ru');
  echo $user->getEmail().'<br />';
  print_r($user);
  echo '<br />';

  // Использование конструктора в анонимном классе

  $user = new class('sfa@mail.ru') { // Параметры для конструктора объекта в анонимном классе задаются прямо после слова class

    private string $email;

    public function __construct(string $email)
    {
      $this->email = $email;
    }

    public function getEmail() : string {
      return $this->email;
    }
  };

  echo $user->getEmail().'<br />';
  print_r($user);
  echo '<br />';
?>