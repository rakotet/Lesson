<?php
$url = 'http://myrusakov.ru/abc.html?id=7&page=8&x=9';
echo $url.'<br/>';
$arr = parse_url($url); //возвращает массив данных этого url
print_r($arr); // get запрос находится в последнем ключе query
echo '<br/>';

parse_str($arr['query'], $query); // возвращает массив распарсенного ключа query
print_r($query);
echo '<br/>';
$query['y'] = 10; // добавляем еще один ключ => значение в массив
unset($query['x']); // удаляем параметр из масива
print_r($query);
echo '<br/>';

$query = http_build_query($query); // получаем uri с новым пораметром
echo $query.'<br/>';

$url = $arr['scheme'].'://'.$arr['host'].$arr['path'].'?'.$query; // записываем значение url с новыми параметрами
echo $url.'<br/>';
