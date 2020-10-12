<?php
    if (isset($_POST['text'])) {
        $text = htmlspecialchars($_POST['text']);
        if (mb_strlen($text) == 0) echo 'Ќет сообщени€';
        else {
            file_put_contents('chat.txt', file_get_contents('chat.txt') . "\n" . $text); // записываем сообщение из формы в файл
            echo 'ok';
        }
    }
    else {
        $arr = explode("\n", file_get_contents('chat.txt')); // ф-€ с помошью разделител€ строки из файла преобразует в массив
        echo json_encode($arr); // кодируем массив в json и передаЄм на выход€щий поток
    }