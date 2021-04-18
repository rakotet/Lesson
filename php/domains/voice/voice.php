<?php
/**
 * Скрипт обрабатывающий POST запрос на добавление голосового коментария
 * Принимает форму содержащую BLOB объект записи голоса пользователя
 * Возвращает JSON бъект в зависимоти от результата обработки
 */

$uploadDir = '../voicedownload/voice/';
$typeFile = explode('/', $_FILES['voice']['type']);
$uploadFile = $uploadDir.'motor'.'.'.time().'.'.$typeFile[1];
if (move_uploaded_file($_FILES['voice']['tmp_name'], $uploadFile)) {
    $response = ['result'=>'ok'];
} else {
    $response = ['result'=>'error'];
}
// echo json_encode(['action'=>'OK', 'data'=>'nahui']);
echo json_encode($response);
