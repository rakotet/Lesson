<?php
$to = 'abc@mail.ru';
$subject = 'Тема';
$text = 'Текст сообщения! Hello World';
$headers = 'From: Вася Пупкин <admin@mysite.local>\r\n';
$headers .= 'Reply-to: <admin@mysite.ru>\r\n';
$headers .= 'Content-type: text/plan; charset=utf-8';
$subject = '=?utf-8?B?'.base64_decode($subject).'?='; // кодируем тему что бы на почтовых клиентах она не отображалась краказябрами
if(mail($to, $subject, $text, $headers)) echo 'Письмо отправлено'; // 1 кому письмо, 2 тело, 3 сам текст пимьма, 4 заголовки
else echo 'Писмо не отправленно';