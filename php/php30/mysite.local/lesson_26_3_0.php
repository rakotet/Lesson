<?php
  class Math {
    public const E = 2.71; // так объявляются константы класса, нельзя изменить значение после инициализации, обращение к ним идет как у статических переменных

    private static $counter = 0; // статическое поле пренадлежит не объекту класса а самому классу (одно значение на все объекты)

    public static function sin($x) {
      self::$counter++;
      return sin($x);
    }

    public static function cos($x) {
      self::$counter++;
      return cos($x);
    }

    public static function e2() {
      self::$counter++;
      return self::E ** 2;
    }

    public static function getCounter() {
      return self::$counter; // к статическим полям обращаться внутри класса нужно self::поле
    }

  }

  // значение статической переменной(поля) $counter сохраняется в самом классе, поэтому он увеличивается после вызова ф-й а не обнуляется как обыное поле

  echo Math::E.'<br />';
  echo Math::e2(5).'<br />';
  echo Math::sin(5).'<br />';
  echo Math::sin(5).'<br />';
  echo Math::cos(5).'<br />';
  echo Math::getCounter().'<br />'; // обращаться к статическим методам класса нужно класс::метод

  // создадим класс User с обычными и статическими свойствами и методами

  class User {
    public $id;
    public $name;
    private static $counter = 0;

    public function __construct($name) {
      $this->name = $name;
      self::$counter++;
      $this->id = self::$counter;
    }

    public static function getCounter() {
      return self::$counter;
    }
  }

  $use_1 = new User('Alex');
  $use_2 = new User('Oleg');
  $use_3 = new User('Igor');

  echo $use_1->id.'<br />';
  echo $use_2->id.'<br />';
  echo $use_3->id.'<br />';
  echo User::getCounter().'<br />';
?>