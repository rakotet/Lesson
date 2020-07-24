<?php
// для общение с другими скриптами/серверами
// Сначала инициализация, потом отправка заголовков, потом тело сообщения, потом получение ответа от сервера, и закрытие соединения
// но в php есть расширение упрощающее эту задачу до
// Инициализация, установка параметров(заголовков) соединения, выполнение запроса с ответом, закрытие соединения, все это спомощью готовых методов

$ch = curl_init('http://mysyte.local/lib/script.php'); // открываем соединение

//curl_setopt($ch, CURLOPT_HEADER, true); // возвращает заголовки
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // настройки соединения(их очень много), 1 соединение, 2 настройка возврат тела запроса
curl_setopt($ch, CURLOPT_POST, true); // настройка типа запроса
curl_setopt($ch, CURLOPT_COOKIE, 'login=Admin;password=123'); // передаём куки, куки разделяются не & а ;
curl_setopt($ch, CURLOPT_POSTFIELDS, 'x=5&y=10'); // передаем параметры значений запроса, разделяются &

$result = curl_exec($ch); // передаём запрос
echo $result;

curl_close($ch); // закрываем соединение

echo '<br/>';
echo '<br/>';


$ch = curl_init('http://google.ru'); // открываем соединение

curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HEADER, true); // возвращает заголовки
curl_setopt($ch, CURLOPT_NOBODY, true); // убираем тело, оставляем лишь заголовки
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // настройки соединения(их очень много), 1 соединение, 2 настройка возврат тела запроса

$result = curl_exec($ch); // передаём запрос

preg_match('/Set-Cookie: NID=(.*?);/i', $result, $matches); // отлавливаем куки через регулярные выражения
curl_setopt($ch, CURLOPT_COOKIE, 'NID='.$matches[1]); // передаем гуглу куки что бы он думал что это наша сессия
print_r($matches);

echo $result;
curl_close($ch); // закрываем соединение