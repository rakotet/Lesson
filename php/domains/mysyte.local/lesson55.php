<?php
$date = new DateTime(); // без параметров будет текущее время
echo $date->format('d.m.Y H:i:s').'<br/>'; // выводим сегодняшнее дату и время через объект класса
$date = new DateTime('2017-05-20 12:05:50');
echo $date->format('d.m.Y H:i:s').'<br/>'; // выводим дату из параметра
$date->setDate(2018, 7, 25); // меняем дату
$date->setTime(23, 15,20); // меняем время
echo $date->format('d.m.Y H:i:s').'<br/>'; // выводим измененную дату
$date->setTimezone(new DateTimeZone('Europe/Moscow')); // меняем часовой пояс
echo $date->getTimezone()->getOffset($date).'<br/>'; // узнаем смещение времени относительно гринвича в Europe/Moscow

$date_1 = new DateTime();
$date_2 = new DateTime('2017-05-20 12:05:50');
$interval = $date_1->diff($date_2); // вычераем из одной даты другую получая массив
print_r($interval);// у полученного массива есть много параметров для вывода (можно увидеть в исходном коде)
echo '<br/>';

$interval = new DateInterval('P2Y1M5DT5H10M15S'); // задаём интервал времени

$date_1->add($interval); //прибавляем к $date_1 заданный интервал времени
echo $date_1->format('d.m.Y H:i:s').'<br/>';

$date = new DateTime(); // текущее время
$interval = new DateInterval('PT1H'); // интервал в виде 1 часа
$period = new DatePeriod($date, $interval, 20); //задаём период, к текущей дате добавляем 1 час 20 раз, при этом создаётся массив данных итераций
foreach ($period as $dt) echo $dt->format('d.m.Y H:i:s').'<br/>';

