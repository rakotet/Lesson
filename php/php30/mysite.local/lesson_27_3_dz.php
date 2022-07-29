<?php
  class Test {
    public $x = 15;
  }

  class Point {
    public $t;
    private $x;
    private $y;

    public function __construct($x, $y) {
      $this->x = $x;
      $this->y = $y;
      $this->t = new Test(); 
    }

    public function __toString() {
      return "Точка с координатами ($this->x, $this->y)<br />";
    }

    public function __clone() { 
      $this->t = clone $this->t; 
      echo 'Клонирование <br />';
    }

    public function __get($name) {
      if(isset($this->$name)) return '"Для доступа к x и y используйте get-методы"';
      else return '"Класс Point работает только в двумерном пространстве"';
    }

    public function __set($name, $value) {
      echo 'Класс Point работает только в двумерном пространстве<br />';
    }

    public function __call($method, $args) {
      echo 'Класс Point работает только в двумерном пространстве<br />';
    }

    public function getX() {
      return $this->x;
    }

    public function getY() {
      return $this->y;
    }
  }

  $p_1 = new Point(10, 20);
  $p_2 = new Point(22, 33);
  $p_3 = new Point(55, 44);
  echo $p_1;
  echo $p_2;
  echo $p_3;

  echo $p_1->x.'<br />';
  echo $p_1->z.'<br />';
  $p_1->z = 1;
  $p_1->setZ();
  
////////////////////////////

  $x = $_POST['x'] ?? false;
  $y = $_POST['y'] ?? false;
  $err = false;
  $mess = false;
  $loadX = '';
  $loadY = '';

  if(isset($_POST['save'])) {
    if(is_numeric($x) && is_numeric($y)) {
      $point = new Point($x, $y);
      $str = serialize($point);
      $distr = fopen('lib/lesson273dz', 'w');
      fwrite($distr, $str);
      fclose($distr);
      $mess = 'Успешно сохранено';
    } else $err = 'Заполните поля целыми числами';
  } elseif (isset($_POST['load'])) {
    if(file_exists('lib/lesson273dz')) {
      $point = unserialize(file_get_contents('lib/lesson273dz'));
      $loadX = $point->getX();
      $loadY = $point->getY();
      $mess = 'Успешно загружено';
    } else $err = 'Нет сохраненного объекта';
    
  }
  
?>
<?php if($err) { ?>
  <p style="color:red;"><?=$err?></p>
<?php } ?>
<?php if($mess) { ?>
  <p style="color:green;"><?=$mess?></p>
<?php } ?>

<form name="myform" action="" method="post">
  <label>X:</label>
  <input type="text" name="x" value="<?=$loadX?>">
  <br/>
  <label>Y:</label>
  <input type="text" name="y" value="<?=$loadY?>">
  <br/>
  <input name="save" type="submit" value="Сохранить">
  <input name="load" type="submit" value="Загрузить">
</form>