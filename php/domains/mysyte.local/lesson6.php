<?php
    $x = 7;
    $y = 10;
    $z = $x + $y;
    echo "x = $x; y = $y<br />";
    echo "Сумма x и y равна $z<br />";
    echo "Разность x и y равна ".($x - $y); //точка склеивает строки (как + в java)
    echo "<br />";
    echo "Произведение х и у равна ".($x * $y);
    echo "<br />";
    echo "Деление х на у равно ".($x / $y);
    echo "<br />";
    echo " Остаток от деления х на у равен ".($x % $y);
    echo "<br />";
    echo "<<х>> в степени <<у>> равно ".($x ** $y);
    echo "<br />";
    echo "Квадратный корень из x равен ".($x ** 0.5);

    $x++; //инкремент
    $x--; //декремент
    
?>