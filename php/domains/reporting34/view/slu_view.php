<?php
require_once '../core/autch.php';
require_once '../core/handler_slu_class.php';
?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Написать служебку</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
    <div>
        <div>
            <a href="../index.php?f=logout">Выход</a>
        </div>
        <div>
            <a href="../index.php?f=main">Назад на главную</a>
        </div>
        <h3>Написать служебку</h3>
        <form name="slujebka" method="post" action="#">
            <div>
                <label for="login">От кого</label>
                <input type="text" name="login" value="<?=$_SESSION['login']?>" disabled/>
            </div>
            <div>
                <label for="list">Кому</label>
                <select name="list">
                    <?php
                    $pdo = new DataBase();
                    $pdo->connect();
                    $userlist = $pdo->users();
                    ?>
                    <?php for ($i = 0; $i < count($userlist); $i++) { ?>
                        <option value="<?=$userlist[$i]['login']?>"><?=$userlist[$i]['login']?></option>
                    <?php } ?>
                </select>
            </div>
            <div>
                <label for="text"></label>
                <textarea name="text" required cols="50" rows="10"></textarea>
            </div>
            <div>
                <input type="submit" name="slujebka" value="Отправить"/>
            </div>
        </form>
        <div>
            <?php if (isset($_POST['slujebka'])) {
                print_r($_POST);
             } ?>
        </div>
    </div>
</body>
</html>