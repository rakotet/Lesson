<?php
require_once '../core/autch_class.php';

//создаем объект для работы с БД
$pdo = new DataBase();
$pdo->connect();
$userlist = $pdo->users();

if (isset($_GET['id']) && isset($_GET['status'])) {
    if($_GET['status'] == 0)
        $_GET['status'] = 1;
    elseif ($_GET['status'] == 1)
        $_GET['status'] = 0;

    $pdo->updateStatus($_GET['id'], $_GET['status']);
    header("Refresh: ");
}

//Условия поиска по заданным значениям формы
if (isset($_POST['searchslu'])) {

    if (isset($_POST['searchlist']) && $_POST['searchkomu'] == '' && $_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchkomu']) && $_POST['searchlist'] == '' && $_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['calendar']) && $_POST['searchkomu'] == '' && $_POST['searchlist'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['calendar'] )&& $_POST['searchkomu'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluLoginDate($_POST['searchlist'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchkomu']) && isset($_POST['calendar']) && $_POST['searchlist'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluListDate($_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['searchkomu']) && $_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluLoginList($_POST['searchlist'], $_POST['searchkomu']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['searchkomu']) && isset($_POST['calendar']) && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluLoginListDate($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif ((isset($_POST['status']) && $_POST['calendar'] == '' && $_POST['searchlist'] == '' && $_POST['searchkomu'] == '')) {
        $searchslu = $pdo->searchSluWork($_POST['status']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['status']) && $_POST['searchkomu'] == '' && $_POST['calendar'] == '') {
        $searchslu = $pdo->searchSluLoginWork($_POST['searchlist'], $_POST['status']);
    }
    else $searchslu = [];

    setcookie('searchlist', $_POST['searchlist'], time() + 3600);
    setcookie('searchkomu', $_POST['searchkomu'], time() + 3600);
    setcookie('calendar', $_POST['calendar'], time() + 3600);
    if (isset($_POST['status']))
    setcookie('status', $_POST['status'], time() + 3600);
    else setcookie('status', '', time() + 3600);

//    setcookie('searchslu', json_encode($searchslu), time() + 3600);
}
else {
    if (isset($_COOKIE['searchlist']) && $_COOKIE['searchlist'] !== '')
    $_POST['searchlist'] = $_COOKIE['searchlist'];

    if (isset($_COOKIE['searchkomu']) && $_COOKIE['searchkomu'] !== '')
    $_POST['searchkomu'] = $_COOKIE['searchkomu'];

    if (isset($_COOKIE['calendar']) && $_COOKIE['calendar'] !== '')
    $_POST['calendar'] = $_COOKIE['calendar'];

    if (isset($_COOKIE['status']) && $_COOKIE['status'] !== '')
    $_POST['status'] = $_COOKIE['status'];


    if (isset($_POST['searchlist']) && @$_POST['searchkomu'] == '' && @$_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne($_POST['searchlist'], @$_POST['searchkomu'], @$_POST['calendar']);
    }
    elseif (isset($_POST['searchkomu']) && @$_POST['searchlist'] == '' && @$_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne(@$_POST['searchlist'], $_POST['searchkomu'], @$_POST['calendar']);
    }
    elseif (isset($_POST['calendar']) && @$_POST['searchkomu'] == '' && @$_POST['searchlist'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne(@$_POST['searchlist'], @$_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['calendar'] )&& $_POST['searchkomu'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluLoginDate($_POST['searchlist'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchkomu']) && isset($_POST['calendar']) && @$_POST['searchlist'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluListDate($_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['searchkomu']) && @$_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluLoginList($_POST['searchlist'], $_POST['searchkomu']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['searchkomu']) && isset($_POST['calendar']) && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluLoginListDate($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif ((isset($_POST['status']) && @$_POST['calendar'] == '' && @$_POST['searchlist'] == '' && @$_POST['searchkomu'] == '')) {
        $searchslu = $pdo->searchSluWork($_POST['status']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['status']) && @$_POST['searchkomu'] == '' && @$_POST['calendar'] == '') {
        $searchslu = $pdo->searchSluLoginWork($_POST['searchlist'], $_POST['status']);
    }
    else $searchslu = [];
}


//else {
//    if (isset($_COOKIE['searchslu']))
//    $searchslu = json_decode($_COOKIE['searchslu'], true);
//    else $searchslu = [];
//}



?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Найти служебку</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link type="text/css" rel="stylesheet" media="all" href="../css/search_slu_view.css" />
    <script type="text/javascript" src="../js/jquery-3.5.1.min.js"></script>
<!--    <script type="text/javascript" src="../js/status.js"></script>-->
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
                <?php if ($search == '0') { ?>
                    <option value="<?=$_SESSION['login']?>"><?=$_SESSION['login']?></option>
                <?php } ?>
                <?php if ($search == '1') { ?>
                    <option></option>
                <?php for ($i = 0; $i < count($userlist); $i++) { ?>
                    <option value="<?=$userlist[$i]['login']?>"><?=$userlist[$i]['login']?></option>
                <?php } ?>
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
            В работе<input type="checkbox" name="status" value="0" />
            Выполнена<input type="checkbox" name="status" value="1" />
        </div>
        <div>
            <input type="submit" name="searchslu" value="Найти"/>
        </div>
    </form>
    <div>
        <?php
        if (isset($_POST['searchslu']) || isset($searchslu)) {
            for($i = 0; $i < count($searchslu); $i++) { ?>
                <div class="text">
                    <?php if ($searchslu[$i]['status'] == 0) { ?>
                        <a href="?id=<?=$searchslu[$i]['id']?>&status=<?=$searchslu[$i]['status']?>"><p id="work">В работе</p></a>
                    <?php }
                        elseif ($searchslu[$i]['status'] == 1) { ?>
                    <a href="?id=<?=$searchslu[$i]['id']?>&status=<?=$searchslu[$i]['status']?>"><p id="nowork">Выполненна</p></a>
                    <?php } ?>

                    <p><?=$searchslu[$i]['data_create'].'</br>'.' От: '.$searchslu[$i]['login'].'</br>'.' Кому: '.$searchslu[$i]['list'].'</br>'.' Тема: '.$searchslu[$i]['topic'].'</br>'?></p>
                    <p><?=$searchslu[$i]['text'].'</br>'?></p>
                </div>
                <p></p>
            <?php }
        } ?>
    </div>
    <div>
        <h3 style='cursor: pointer;'>Получить случайного пользователя из БД</h3>
    </div>
    <div id="result"></div>
<div>POST:<?=print_r($_POST)?></div>
<p></p>
<div>GET:<?=print_r($_GET)?></div>
<p></p>
<div>КУКИ: <?=print_r($_COOKIE)?></div>
<p></p>
    <div>searchslu: <?=print_r($searchslu)?></div>
</body>
</html>