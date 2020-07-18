<?php
// в php нет возможности наследовать сразу несколько классов

abstract class Shape { // на основе абстрактного класса нельзя создовать объекты

    protected $x;
    protected $y;

    abstract public function draw(); // абстрактный метод обязательно должен быть реализован в классах наследниках

    public function __toString()
    {
        return print_r($this, true);
    }
}

class Circle extends Shape { // наследуемся от другого класса

    private $r;

    public function __construct($x, $y, $r)
    {
        $this->x = $x;
        $this->y = $y;
        $this->r = $r;
    }

    public function draw()
    {
        echo 'Рисуем окружность с координатами центра '.$this->x. ' и '.$this->y;
        echo '<br/>Радиус '.$this->r;
    }
}

class Rectangle extends Shape { // наследуемся от другого класса

    private $w;
    private $h;

    public function __construct($x, $y, $w, $h)
    {
        $this->x = $x;
        $this->y = $y;
        $this->w = $w;
        $this->h = $h;
    }

    public function draw()
    {
        echo 'Рисуем прямоугольник с координатами левого верхнего угла '.$this->x. ' и '.$this->y;
        echo '<br/>Ширина '.$this->w.', Высота '.$this->h;
    }
}

$circle = new Circle(5,8,10);
$rect = new Rectangle(20, 20, 40, 10);

echo $circle->draw().'<br/>';
echo $rect->draw().'<br/>';
echo $rect.'<br/>';
echo $circle.'<br/>';
echo '_____________<br/>';

$r = new Rectangle(210, 220, 430, 102);

$list = [$circle, $rect, $r];
foreach ($list as $l) {
    $l->draw();
    echo '<br/>';
}
?>
