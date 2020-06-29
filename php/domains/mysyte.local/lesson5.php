<?php
    define("COLOR", "#c00"); //объявляем константу, первый аргумент имя, второй значение
    echo COLOR;
    echo "<br />";

    echo defined("COLOR"); //проверка на существование константы
    echo "<br />";

    //Встроенные константы в php
    echo __FILE__; // содержит путь к файлу в котором выполняется скрипт
    echo "<br />";
    echo PHP_VERSION; //содержит версию php
    echo "<br />";
?>

<p style="color: <?=COLOR?>">Hello Word!</p> <!--используем php константу в html-->