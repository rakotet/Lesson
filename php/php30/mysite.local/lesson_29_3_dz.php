<?php
  interface CanMov {

    public function move();

  }

  interface CanFly {

    public function fly();

  }

  class Car implements CanMov {

    public function move() {
      echo 'Движение автомобиля<br />';
    }

  }

  class Aircraft implements CanFly {

    public function fly() {
      echo 'Полёт самолёта<br />';
    }

  }

  $car = new Car();
  $aircraft = new Aircraft();
  $car->move();
  $aircraft->fly();

  trait Move {
    public function move() {
      echo 'Движение автомобиля1<br />';
    }
  }

  trait Fly {
    public function fly() {
      echo 'Полёт самолёта1<br />';
    }
  }

  class Car1 {

    use Move;

  }

  class Aircraft1 {

    use Fly;

  }

  $car1 = new Car1();
  $aircraft1 = new Aircraft1();
  $car1->move();
  $aircraft1->fly();
?>