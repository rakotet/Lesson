<?php
    $x = $_POST['x']? htmlspecialchars($_POST['x']) : 0; // если запрос не пустой, то обезопасиваем переданные данные и записываем в переменую, иначе записываем 0
    $y = $_POST['y']? htmlspecialchars($_POST['y']) : 0;
    if (!is_numeric($x) || !is_numeric($y)) echo 'string'; // если ввели не цифры, то отправить
    else echo $x + $y;
