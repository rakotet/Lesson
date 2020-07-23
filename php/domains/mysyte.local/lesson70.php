<?php
//http://mysyte.local/?a=2445dfdgg+%3Cb%3Edfdg%3Cb/%3E запрос пользователя или злоумышленника
//Все приходящие данные от пользователей должны быть проверенны на корректность

$a = $_GET['a']; // записываем не обработанный запрос в переменную
echo $a.'<br/>';
$a = htmlspecialchars($a); // переводит весь html код в строку, что бы не мог работать переданынй код злоумышленника
echo $a.'<br/>';

//проверка email на валидность
$email_1 = 'abc@mail.ru';
$email_2 = 'abcmail.ru';
echo filter_var($email_1, FILTER_VALIDATE_EMAIL); // 1 передаем строку, 2 констранта типа проверки, возвращает строку если корректна или false если не корректна
echo filter_var($email_2, FILTER_VALIDATE_EMAIL); // 1 передаем строку, 2 констранта типа проверки, возвращает строку если корректна или false если не корректна
echo '<br/>';
//проверка ip на валидность
$ip = '127.0.0.1';
echo filter_var($ip, FILTER_VALIDATE_IP).'<br/>';
//проверка url на валидность
$url = 'https://myrusakov.ru';
echo filter_var($url, FILTER_VALIDATE_URL).'<br/>';
//проверка целых чисел на валидность
$n = '5';
echo filter_var($n, FILTER_VALIDATE_INT).'<br/>';
//проверка дробных чисел на валидность
$d = '5.5';
echo filter_var($d, FILTER_VALIDATE_FLOAT).'<br/>';
//проверка дробных чисел на валидность
$b = 'on';
echo filter_var($b, FILTER_VALIDATE_BOOLEAN).'<br/>'; // возвращает отфильтрованные данные в виде boolean
$y = 'yes';
echo filter_var($y, FILTER_VALIDATE_BOOLEAN).'<br/>'; // возвращает отфильтрованные данные в виде boolean
