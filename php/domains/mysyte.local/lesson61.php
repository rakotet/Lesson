<?php
// отражение это механизм который позволяет исследовать любые классы в php

$obj = 'DateTime';
$obj = new $obj; // не явный вызов конструктора объекта DateTime
if ($obj instanceof DateTime) echo $obj->format('Y.m.d H:i:s');
echo '<br/>';

$rc = new ReflectionClass('IntlChar'); // указываем класс для иследования (получаем все свойства и методы класса)
echo $rc.'<br/>';



