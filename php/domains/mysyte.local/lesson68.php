<?php
//отправка писем через написанную библиотеку гитхабом
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once 'lib/PHPMailer.php'; // подключаем стороннию скачанную библиотеку

$mail = new PHPMailer(); // создаём объект этого класса
try {
    $mail->CharSet = 'utf-8';
    $mail->setFrom('admin@mysite.local', 'Администратор'); // от кого отправляем
    $mail->addAddress('joe@example.net', 'Joe User'); // кому
    $mail->addReplyTo('info@example.com', 'Information'); // кому ответ
    $mail->addAttachment('lib/a.txt');
    $mail->isHTML(true); // письмо может содержать html формат в том числе
    $mail->Subject = 'Тема';
    $mail->Body = 'Текст <b>письма</b> с html кодом';
    $mail->AltBody = 'Текст письма без html кода';

    $mail->send();
    echo 'Письмо отправлено';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
