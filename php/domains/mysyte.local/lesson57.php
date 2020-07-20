<?php
//виртуальные массивы создаются методом реализации интерфейса ArrayAccess для объектов класса, для того что бы работать с объектами как с массивами

class MyArray implements ArrayAccess
{
    private $arr = [];

    public function offsetExists($offset) // определяет есть ли значение у переменной отличное от null
    {
        return isset($this->arr[$offset]);
    }

    public function offsetGet($offset) // возвращаем значение переменной
    {
        return $this->arr[$offset];
    }

    public function offsetSet($offset, $value) // меняем значение переменной
    {
        $this->arr[$offset] = $value;
    }

    public function offsetUnset($offset) // удаляем переменную
    {
        unset($this->arr[$offset]);
    }
}

$a = new MyArray();
$a['Name'] = 'Michail';
$a['Age'] = 26;
echo $a['Name'].' - '.$a['Age'].'<br/>';
echo isset($a['Name']).'<br/>';
unset($a['Name']);
echo isset($a['Name']).'<br/>';
