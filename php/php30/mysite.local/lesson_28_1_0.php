<?php
  class Data {

    private int $a; // можно указывать тип всойства объекта при создании свойства в классе
    private float $f;
    private array $arr;
    private string $str;

    public function __construct(int $a, float $f, array $arr, string $str) { // указывет тип значения принимаемого аргумента ф-и, php будет пытаться привести значение к указанному типу, если не получится выдалс ошибку
      $this->a = $a;
      $this->f = $f;
      $this->arr = $arr;
      $this->str = $str;
    }

    public function sort(array $arr, callable $compare) : array { // ф-я принимает массив и ф-ю, возвращает масив, ф-я использует пузырьковый метод сортировки для массива по убыванию
      for($i = 0; $i < count($arr); $i++) {
        $max_index = $i;
        $max_value = $arr[$i];
        for($j = $i; $j < count($arr); $j++) {
          if($compare($max_value, $arr[$j]) == -1) {
            $max_value = $arr[$j];
            $max_index = $j;
          }
        }
        $temp = $arr[$i];
        $arr[$i] = $max_value;
        $arr[$max_index] = $temp;
      }
      return $arr;
    }

    public function newObject(int|float $a) : stdClass|null { // комбинированный тип принимаемых и возвращаемых данных, ф-я принимает int или float возвращает class или null, вместо stdClass можно указывать любой класс в том числе созданный нами.
      if($a < 0) return null;
      $obj = new stdClass();
      $obj->a = $a;
      return $obj;
    } 
  }

  $d = new Data(15, 15.7, [1, 2, 3], 'Строка');
  print_r($d);
  echo '<br />';

  $arr = $d->sort([5, 7, 1, 3, 3, 0, 4], function($a, $b) {return $a <=> $b;});
  print_r($arr);
  echo '<br />';

  print_r($d->newObject(15));
  echo '<br />';
?>