<?php
require_once '../core/autch_class.php';

$pdo = new DataBase();
$pdo->connect();
$userlist = $pdo->users();
?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Написать служебку</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link type="text/css" rel="stylesheet" media="all" href="../css/slu_create_view.css" />
</head>
<body>
    <div id="container">
        <div>
            <a href="../index.php?f=logout">Выход</a>
        </div>
        <div>
            <a href="../index.php?f=main">Назад на главную</a>
        </div>
        <h3>Написать служебку</h3>
        <div>
        <form name="slujebka" method="post" action="../index.php">
            <div class="form">
                <div>От кого</div>
                <div><input type="text" name="login" value="<?=$_SESSION['login']?>" disabled/></div>
                <div>Кому</div>
                <div>
                <select name="list">
                    <?php for ($i = 0; $i < count($userlist); $i++) { ?>
                        <option value="<?=$userlist[$i]['login']?>"><?=$userlist[$i]['login']?></option>
                    <?php } ?>
                </select>
                </div>
                <div>Тема</div>
                <div><input type="text" name="topic" required></div>
                <div><textarea name="text" required cols="50" rows="10"></textarea></div>
                <div><input type="submit" name="slujebka" value="Отправить"/></div>
            </div>
        </form>
        </div>
    </div>
</body>
</html>