<?php
require_once '../core/autch_class.php';

$pdo = new DataBase();
$pdo->connect();
$userlist = $pdo->users();
if (isset($_POST)) {
    if (isset($_POST['searchlist']) && $_POST['searchkomu'] == '' && $_POST['calendar'] == '') {
        $searchslu = $pdo->searchSlu($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchkomu']) && $_POST['searchlist'] == '' && $_POST['calendar'] == '') {
        $searchslu = $pdo->searchSlu($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['calendar']) && $_POST['searchkomu'] == '' && $_POST['searchlist'] == '') {
        $searchslu = $pdo->searchSlu($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['calendar'] )&& $_POST['searchkomu'] == '') {
        $searchslu = $pdo->searchSluLoginDate($_POST['searchlist'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchkomu']) && isset($_POST['calendar']) && $_POST['searchlist'] == '') {
        $searchslu = $pdo->searchSluListDate($_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['searchkomu']) && $_POST['calendar'] == '') {
        $searchslu = $pdo->searchSluLoginList($_POST['searchlist'], $_POST['searchkomu']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['searchkomu']) && isset($_POST['calendar'])) {
        $searchslu = $pdo->searchSluLoginListDate($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
}
?>

<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Найти служебку</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link type="text/css" rel="stylesheet" media="all" href="../css/search_slu_view.css" />
</head>
<body>
    <div>
        <a href="../index.php?f=logout">Выход</a>
    </div>
    <div>
        <a href="../index.php?f=main">Назад на главную</a>
    </div>
    <h3>Найти служебку</h3>
    <form name="searchslu" method="post" action="">
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
        <?php
        if (isset($_POST['searchslu'])) {
            for($i = 0; $i < count($searchslu); $i++) { ?>
                <div class="text">
                    <p><?=$searchslu[$i]['data_create'].'</br>'.' От: '.$searchslu[$i]['login'].'</br>'.' Кому: '.$searchslu[$i]['list'].'</br>'.' Тема: '.$searchslu[$i]['topic'].'</br>'?></p>
                    <p><?=$searchslu[$i]['text'].'</br>'?></p>
                </div>
                <p></p>
            <?php }
        } ?>
    </div>
    <div>
        <?= print_r($_POST) ?>
    </div>
</body>
</html>