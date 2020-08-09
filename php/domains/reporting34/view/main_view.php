<?php
require_once '../core/session_class.php';
session_start();
print_r($_SESSION);
echo '<br/>';
echo $_SESSION['login'].'<br/>';
echo $lo;

//if($_SESSION['login'] !== $lo){
//    header("Location: http://reporting34/");
//    exit;
//}
?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Главная страница</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<form name="slu" method="post" action="index.php">
    <div><input type="submit" name="slu" value="Написать служебку"/></div>
</form>
</body>
</html>