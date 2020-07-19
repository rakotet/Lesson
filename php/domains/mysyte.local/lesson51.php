<?php
// @ оператор отключения ошибок

$handler = @fopen('f.txt', 'r'); // @ глушит ошибку в данной конструкции
if($handler == false) echo 'ошибка открытия файла<br/>';
if(!empty($_POST['myform'])) // проверяем существует ли и имеет не нулевое значение переменная myform в массиве $_POST
{
    echo 'Форма отправлена<br/>';
}
?>

<form name="myform" action="index.php" method="post">
    <div>
        <input type="submit" name="myform" value="Отправить"/>
    </div>
</form>
