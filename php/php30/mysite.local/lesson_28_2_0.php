<?php
  // Нельзя создать объект от абстрактного класса!!! От него можно только наследоваться.
  // Все абстрактные методы должны быть реализованны в классах наследниках!!! иначе ошибка.

  abstract class Shape { // создаём абстрактный класс через ключевое слово abstract, от которого будем наследоваться, наследоваться от обычных классов является дурным тоном в программировании

    protected float $x;
    protected float $y;

    public function getData() : array {
      return [$this->x, $this->y];
    }

    abstract function draw(); // создаём абстрактный метод через ключевое слово abstract, абстактные методы не имеют реализации и вместо {} идет ;

    protected function sep() {
      echo '<br />-----------------<br />';
    }
  }

  class Circle extends Shape { // наследуемся от класса Shape через ключевое слово extends

    private float $r;

    public function __construct(float $x, float $y, float $r)
    {
      $this->x = $x;
      $this->y = $y;
      $this->r = $r;
    }

    public function getData() : array { // переопределяем родительский метод (для этого нужно сохранить сигнатуру метода: модификатор, агрументы, возвращаемый тип)
      $data = parent::getData(); // вызываем реализацию родительского метода через ключевое слово parent::имя метода
      $data[] = $this->r;
      return $data;
    }

    public function draw() // делаем реализацию абстрактному классу
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