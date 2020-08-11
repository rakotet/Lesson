<?php
require_once '../core/autch_class.php';

$pdo = new DataBase();
$pdo->connect();
$userlist = $pdo->users();
$searchslu = $pdo->searchSlu($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
?>

<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Найти служебку</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
    <div>
        <a href="../index.php?f=logout">Выход</a>
    </div>
    <div>
        <a href="../index.php?f=main">Назад на главную</a>
    </div>
    <h3>Найти служебку</h3>
    <form name="searchslu" method="post" action="#">
        <div>
            <label for="calendar">Выберите дату</label>
            <input type="date" name="calendar" />
        </div>
        <div>
            <label for="searchlist">От кого</label>
            <select name="searchlist">
                <option value=""></option>
                <?php for ($i = 0; $i < count($userlist); $i++) { ?>
                    <option value="<?=$userlist[$i]['login']?>"><?=$userlist[$i]['login']?></option>
                <?php } ?>
            </select>
        </div>
        <div>
            <label for="searchkomu">Кому</label>
            <select name="searchkomu">
                <option value=""></option>
                <?php for ($i = 0; $i < count($userlist); $i++) { ?>
                    <option value="<?=$userlist[$i]['login']?>"><?=$userlist[$i]['login']?></option>
                <?php } ?>
            </select>
        </div>
        <div>
            <input type="submit" name="searchslu" value="Найти"/>
        </div>
    </form>
    <div>
        <?php for($i = 0; $i < count($searchslu); $i++) { ?>
            <p id="p<?=$i?>"><?=$searchslu[$i]['data_create'].' От: '.$searchslu[$i]['login'].' Кому: '.$searchslu[$i]['list'].' Тема: '.$searchslu[$i]['topic']?></p>
        <?php } ?>
    </div>
</body>
</html>