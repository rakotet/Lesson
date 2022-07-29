<?php
  // Сериализация объекта - это перевод объекта в строку и обратно в объект

  class User {
    public $email;
    public $password;
    public $weacup_time;
    private static $secret = 'asdf8ds';

    public function __construct($email, $password) {
      $this->email = $email;
      $this->password = md5($password.self::$secret);
    }

    public function __sleep() { // вызывается автоматически при сериализации объекта
      return ['email', 'password']; // указываем какие поля объекта будут сохраняться при сериализации объекта
    }

    public function __wakeup() { // вызывается автоматически при десериализации объекта 
      $this->weacup_time = time();
    }
  }

  $user = new User('asdf@mail.ru', '123456');
  print_r($user);
  echo '<br />';

  $str = serialize($user);
  echo $str.'<br />';

  $fp = fopen('lib/lesson2720/'.$user->email, 'w');
  fwrite($fp, $str);
  fclose($fp);

  $str = file_get_contents('lib/lesson2720/'.$user->email);
  $u = unserialize($str);
  print_r($u);
  echo '<br />';
?>