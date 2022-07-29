<?php
  class User {
    private $name = 'User'; 
    private $email;
    private static $counter = 0;

    public function __construct($x = false, $y = false) {
      $this->name = $x;
      $this->email = $y;
      self::$counter++;
    }

    public static function getCounter() {
      return self::$counter;
    }

    public function getX() {
      return $this->name;
    }

    public function getY() {
      return $this->email;
    }

    public function setX($x) {
      $this->name = $x;
    }

    public function setY($y) {
      $this->email = $y;
    }
  }

  $user = new User('alex', '123');
  //$user->name;
  echo $user->getX().'<br />';
  echo $user->getY().'<br />';
  echo $user->setX('oleg');
  echo $user->setY('3546');
  echo $user->getX().'<br />';
  echo $user->getY().'<br />';

  $user_2 = new User();
  echo $user_2->getX().'<br />';
  echo $user_2->getY().'<br />';
  echo User::getCounter();
  
  echo '<br />';
  echo '<br />';

  print_r($user);
?>