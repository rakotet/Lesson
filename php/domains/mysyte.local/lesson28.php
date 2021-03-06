<?php
    $start = microtime(true); // возвращает число секунд до тысячных прошедших с даты 01.01.1970 00:00
    echo $start;
    echo '<br/>';

    $time = time(); //возвращает число секунд прошедших с даты 01.01.1970 00:00
    echo $time.'<br/>';

    echo 'Текущее время: '.date('d.m.Y H:i:s'); // выводим сегодняшнию дату в формате день.месяц.год час:минуты:секунды
    echo '<br/>';

    $time = mktime(2, 0, 30, 5, 10, 2017); // параметры час, минуты, секунды, месяц, день, год (создание временной метки)

    echo 'Получившееся дата и время: '.date('d.m.Y H:i:s', $time); // выводим конкретное время  указанное в метке $time
    echo '<br/>';

    $time = strtotime('12.05.2016'); // переводит дату в количество секунд прошедших с 01.01.1970 00:00
    echo $time.'<br/>';
    echo date('Y.m.d', $time).'<br/>'; // переводим колличесво секунд в дату по указанному шаблону

    $d = 32;
    $m = 1;
    $y = 2017;
    if (checkdate($m, $d, $y)) echo 'Дата корректна'; // функция проверяет существует ли такая дата (месяц, день, год)
    else echo 'Дата не корректна';

    echo '<br/>';

    function getGM($local) { // функция находит количесво прошедших секунд по гринвичу
        $offset = date('Z', $local); // находим текущее отклонение от гринвича (часовой пояс, в данном случае +3)
        return $local - $offset;
    }

    function getLM ($gm, $offset) { // к времени по гринвичу прибовляем часововй пояс
        return $gm + $offset;
    }

    echo date('Y.m.d H:i:s', getGM(time())); // выводим время по шаблону, но с временной меткой по гринвичу
    echo '<br/>';
    echo date('Y.m.d H:i:s', getLM(getGM(time()), 3600 * 2)); // выводим время по шаблону, но с временной меткой + 2 часа
    echo '<br/>';



    echo '<br/>Время работы скрипта: '.(microtime(true) - $start); // используется что бы узнать время работы скрипта
?>