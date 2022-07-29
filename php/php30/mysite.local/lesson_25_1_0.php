<?php
  class User {
    public $name = 'User'; // public - можно получить и изменить свойство у объекта данного класса
    public $email;
  }

  $user_1 = new User(); // создаём экземпляр класса (объект) ключевым словом new 

  echo $user_1->name.'<br />'; // обращаться к свойствам объекта нужно через -> 
  $user_1->email = '12user@local.ru'; // изменения значений свойств объекта тоже идет через ->
  echo $user_1->email.'<br />';

  print_r($user_1);
?>