<?php
  // Магические методы это методы потипу конструктора и деструктора в классе. (Все магические методы начинаются с __имяметода)

  class Data {
    public $a = 5;
    private $data;

    public function __construct() {
      $this->data = [];
    }

    public function __get($name) { // автоматические вызывается самим php когда мы в объекте класса обращаемся к свойству которое не доступно или отсутствует
      if(isset($this->data[$name])) return $this->data[$name];
      return 'нет';
    }

    public function __set($name, $value) { // автоматические вызывается самим php когда мы в объекте класса пытаемся изменить значение свойства которое не доступно или отсутствует
      $this->data[$name] = $value;
    }

    public function __toString() { // вызывается самим php когда мы пытаемся представить объект в виде строки
      $s = '';
      foreach($this->data as $k => $v) $s.= "$k = $v; ";
      return $s;
    }

    public function __isset($name) { // вызывается при проверке существования инзачально не существующего свойства в объекте 
      return isset($this->data[$name]);
    }

    public function __unset($name) { // вызывается при попытке удаления не существующего изначально или не доступного свойства в объекте
      unset($this->data[$name]);
    }

    public function __call($mathod, $args) { // вызывается когда пытаемся вызвать не существующий у объекта метод
      echo "Метод $mathod не существует<br />";
      echo "Переданные аргументы: ".print_r($args, true);
    }

    public static function __callStatic($mathod, $args) { // вызывается когда пытаемся вызвать не существующий у объекта статический метод
      echo "Статический метод $mathod не существует<br />";
      echo "Переданные аргументы: ".print_r($args, true);
    }
  }

  $data = new Data();
  echo $data->b.'<br />';
  $data->data = 3;
  $data->b = 20;
  echo $data->b.'<br />';
  echo $data.'<br />';
  unset($data->b);
  echo $data->b.'<br />';
  $data->gooGaChad(1, 2, 5);
  echo '<br />';
  Data::gooGaChad(1, 2, 5);
?>