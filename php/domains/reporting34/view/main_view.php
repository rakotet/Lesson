<?php
require_once '../core/autch.php';

?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Главная страница</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<div>
    <form name="search" method="post" action="../index.php">
        <div><input type="submit" name="search" value="Найти служебку"/></div>
    </form>
</div>
    <div>
        <form name="slu" method="post" action="../index.php">
            <div><input type="submit" name="slu" value="Написать служебку"/></div>
        </form>
    </div>
    <div>
        <a href="../index.php?f=logout">Выход</a>
    </div>
</body>
</html>