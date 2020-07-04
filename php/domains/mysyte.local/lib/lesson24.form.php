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