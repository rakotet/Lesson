<?php
  // Интерфейс позволяет описывать ф-и без какой либо реализации, интерфейс нужен для реализации его в других классах, по сути он похож на класс без полей только с набором абстрактных методов
  // В php нет множественного наследовая (когда клас наследуется от нескольких других классов), и для этого в том числе нужны интерфейсы
  // В классах можно реализовывать сразу несколько интерфейсов
  // Все методы интерфейса должны обязательно иметь реализацию в классах наследниках
  // Интерфейс можно воспринимать как свод, список обязоностей класса
  // Интерфейс может переходить по наследованию или имплементироваться в нуждающийся в нём класс

  interface Draw { // создаем интерфейс с помощью ключевого слова interface

    public function draw();
  }

  interface Data {
    
    public function getData() : array;
  }

  abstract class Shape implements Draw, Data { // реализовываем интерфейс в классе спомощью ключевого слова implements (через запятую перечисляем все нужные нам интерфейсы)

    protected float $x;
    protected float $y;

    public function getData() : array {
      return [$this->x, $this->y];
    }

    protected function sep() {
      echo '<br />-----------------<br />';
    }
  }

  class Circle extends Shape { 

    private float $r;

    public function __construct(float $x, float $y, float $r)
    {
      $this->x = $x;
      $this->y = $y;
      $this->r = $r;
    }

    public function getData() : array { 
      $data = parent::getData(); 
      $data[] = $this->r;
      return $data;
    }

    public function draw() 
    {
      echo "Рисуем окружность с координатами центра $this->x и $this->y <br /> Радиус $this->r";
      $this->sep();
    }
  }

  class Rectangle extends Shape {

    private float $w;
    private float $h;

    public function __construct(float $x, float $y, float $w, float $h)
    {
      $this->x = $x;
      $this->y = $y;
      $this->w = $w;
      $this->h = $h;
    }

    public function getData() : array { 
      $data = parent::getData(); 
      $data[] = $this->w;
      $data[] = $this->h;
      return $data;
    }

    public function draw()
    {
      echo "Рисуем прямоугольник с координатами верхнего левого угла $this->x и $this->y";
      echo "<br /> Ширина $this->w, Высота $this->h";
      $this->sep();
    }
  }

  $c1 = new Circle(2, 3, 5);
  $c2 = new Circle(10, 43, 28);
  $c1->draw();
  $c2->draw();
  print_r($c1->getData());
  print_r($c2->getData());
  echo '<br />';

  $r1 = new Rectangle(5, 6, 11, 12);
  $r2 = new Rectangle(9, 10, 15, 15);

  $arr = [$c1, $c2, $r1, $r2];

  foreach($arr as $value) {
    echo 'Даныне фигуры: '.print_r($value->getData(), true).'<br />';
    $value->draw();
  }

?>