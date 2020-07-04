<?php
    $_GET; // массив содержащай в себе get запросы (значения видны в адресной строке)
    $_POST; // массив содержащай в себе post запросы (значения не видны в адресной строке)
    $_REQUEST; //универсальный массив содержит и get и post запросы (сумма массивов GET и POST)

    print_r($_GET);
    echo '<br/>';
    print_r($_POST);
    echo '<br/>';
    print_r($_REQUEST);
    echo '<br/>';
    echo '<br/>';

    $summa = false;
    $x = false;
    $y = false;

    if (isset($_POST['myform'])) { // проверяем отправлена ли форма на сервер (если имя нашей формы myform (имя кнопки) есть в массиве POST значит отправлена)
        $x = $_POST['x'] ?? false; // получаем значение из форм и записываем его в переменные. ?? означает - если этого элемента не существует в массиве, то записываем false (защита от злоумышленников)
        $y = $_POST['y'] ?? false;
        if ($x !== false && $y !== false && is_numeric($x) && is_numeric($y)) $summa = $x + $y; //если $x и $y не false и являются числа тогда считаем сумму
    }
?>
<?php if ($summa !== false) : ?><p>Сумма равна: <?=$summa?></p><?php endif ?> <!--если $summa true тогда создаём тег <p></p> и в нем выводим сумму-->
<form name="myform" action="<?=$_SERVER['PHP_SELF']?>" method="post"> <!--указываем в action исполняемый файл (index.php) через массив SERVER-->
    <div>
        X: <input type="text" name="x" value="<?=$x?>"/> <!--создаём поле ввода-->
    </div>
    <div>
        Y: <input type="text" name="y" value="<?=$y?>"/>
    </div>
    <div>
        <input type="submit" name="myform" value="Сумма"/> <!--создаём кнопку-->
    </div>
</form>