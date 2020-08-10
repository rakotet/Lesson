<?php
require_once '../core/autch.php';

$pdo = new DataBase();
$pdo->connect();
$userlist = $pdo->users();

?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Написать служебку</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
    <div>
        <h3>Написать служебку</h3>
        <form name="slujebka" method="post" action="../index.php">
            <div>
                <label for="login">От кого</label>
                <input type="text" name="login" value="<?=$_SESSION['login']?>" disabled="disabled"/>
            </div>
            <div>
                <label for="list">Кому</label>
                <select name="list">
                    <?php for ($i = 0; $i < count($userlist); $i++) { ?>
                        <option value="<?=$userlist[$i]['login']?>"><?=$userlist[$i]['login']?></option>
                    <?php } ?>
                </select>
            </div>
            <div>

            </div>
            <div>
                <input type="submit" name="slujebka" value="Отправить"/>
            </div>
        </form>
        <div>
            <a href="../index.php?f=logout">Выход</a>
        </div>
    </div>
</body>
</html>