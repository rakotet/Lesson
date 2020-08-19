<?php
require_once '../core/autch_class.php';

//создаем объект для работы с БД
$pdo = new DataBase();
$pdo->connect();
$userlist = $pdo->users();

$openid = '';

if (isset($_GET['id']) && isset($_GET['status'])) {
    if($_GET['status'] == 0)
        $_GET['status'] = 1;
    elseif ($_GET['status'] == 1)
        $_GET['status'] = 0;

    $pdo->updateStatus($_GET['id'], $_GET['status']);
    header("Refresh: ");
}


if (isset($_GET['open'])) {
    setcookie('id', $_GET['open'], time() + 3600);
    $openid = $_GET['open'];
}


if (isset($_POST['commit']) && $_POST['commit'] == 'Добавить комментарий') {
    $pdo->updateText($_COOKIE['id'], $_POST['text'], $_SESSION['login']);
    $_POST['commit'] = '';
}

if (isset($_POST['sign']) && $_POST['sign'] == 'Подписать') {
    $pdo->sign($_GET['open'], $_SESSION['login']);
}

if (isset($_POST['redirect']) && $_POST['redirectList'] !== '') {
    $pdo->redirect($_GET['open'], $_POST['redirectList']);
}

//Условия поиска по заданным значениям формы
if (isset($_POST['searchslu'])) {

    if (isset($_POST['searchlist']) && $_POST['searchkomu'] == '' && $_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne($_POST['searchlist'], $_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['mne']) && isset($_POST['status']) && isset($_POST['searchlist']) && $_POST['searchkomu'] == '' && $_POST['calendar'] == '') {
        $searchslu = $pdo->searchSluMneStatus($_SESSION['login'], $_POST['status']);
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
    elseif (isset($_POST['status']) && $_POST['calendar'] == '' && $_POST['searchlist'] == '' && $_POST['searchkomu'] == '') {
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
    if (isset($_POST['mne']))
    setcookie('mne', $_POST['mne'], time() + 3600);
    else setcookie('mne', '', time() + 3600);

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

    if (isset($_COOKIE['mne']) && $_COOKIE['mne'] !== '')
        $_POST['mne'] = $_COOKIE['mne'];


    if (isset($_POST['searchlist']) && @$_POST['searchkomu'] == '' && @$_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne($_POST['searchlist'], @$_POST['searchkomu'], @$_POST['calendar']);
    }
    elseif (isset($_POST['mne']) && isset($_POST['status']) && isset($_POST['searchlist']) && @$_POST['searchkomu'] == '' && @$_POST['calendar'] == '') {
        $searchslu = $pdo->searchSluMneStatus($_SESSION['login'], $_POST['status']);
    }
    elseif (isset($_POST['searchkomu']) && @$_POST['searchlist'] == '' && @$_POST['calendar'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne(@$_POST['searchlist'], $_POST['searchkomu'], @$_POST['calendar']);
    }
    elseif (isset($_POST['calendar']) && @$_POST['searchkomu'] == '' && @$_POST['searchlist'] == '' && !isset($_POST['status'])) {
        $searchslu = $pdo->searchSluOne(@$_POST['searchlist'], @$_POST['searchkomu'], $_POST['calendar']);
    }
    elseif (isset($_POST['searchlist']) && isset($_POST['calendar'] )&& @$_POST['searchkomu'] == '' && !isset($_POST['status'])) {
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
    <script>
        $(window).on("scroll", function(){
            $('input[name="scroll"]').val($(window).scrollTop());
        });

        <?php if (!empty($_REQUEST['scroll'])): ?>
        $(document).ready(function(){
            window.scrollTo(0, <?php echo intval($_REQUEST['scroll']); ?>);
        });
        <?php endif; ?>
    </script>
</head>
<body>
    <div id="container">
        <div>
            <a href="../index.php?f=logout">Выход</a>
        </div>
        <div>
            <a href="../index.php?f=main">Назад на главную</a>
        </div>
        <h3>Найти служебку</h3>
        <form name="searchslu" method="post" action="?">
            <div class="form1">
                <div>Выберите дату</div>
                <div><input type="date" name="calendar" /></div>
                <div>От кого</div>
                <div>
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
                <div>Кому</div>
                <div>
                <select name="searchkomu">
                    <option value=""></option>
                    <?php for ($i = 0; $i < count($userlist); $i++) { ?>
                        <option value="<?=$userlist[$i]['login']?>"><?=$userlist[$i]['login']?></option>
                    <?php } ?>
                </select>
                </div>
                <div>
                    <div>У меня в работе<br><input type="checkbox" name="status" value="0" /><br></div>
                    <div>Выполненные<br><input type="checkbox" name="status" value="1" /><br></div>
                    <div>Адресованные мне<br><input type="checkbox" name="mne" value="3"/></div>
                </div>
                <div><input type="submit" name="searchslu" value="Найти"/></div>
            </div>
        </form>
        <div class="formtext">
            <?php
            if (isset($_POST['searchslu']) || isset($searchslu)) {
                for($i = 0; $i < count($searchslu); $i++) { ?>
                    <div class="text">
                        <?php if ($searchslu[$i]['status'] == 0) { ?>
                            <?php if ($search == 1) { ?>
                                <form method="post" action="?id=<?=$searchslu[$i]['id']?>&status=<?=$searchslu[$i]['status']?>">
                                    <input type="hidden" name="scroll" value="">
                                    <input id="work" type="submit" name="commit" value="В работе"/>
                                    <p></p>
                                </form>
                            <?php } ?>
                            <?php if ($search == 0) { ?>
                            <p id="work">В работе</p>
                            <?php } ?>
                            <?php }
                            elseif ($searchslu[$i]['status'] == 1) { ?>
                            <?php if ($search == 1) { ?>
                                <form method="post" action="?id=<?=$searchslu[$i]['id']?>&status=<?=$searchslu[$i]['status']?>">
                                    <input type="hidden" name="scroll" value="">
                                    <input id="nowork" type="submit" name="commit" value="Выполненна"/>
                                    <p></p>
                                </form>
                            <?php } ?>
                            <?php if ($search == 0) { ?>
                                <p id="nowork">Выполненна</p>
                            <?php } ?>
                        <?php } ?>

                        <div><?=$searchslu[$i]['data_create'].'</br>'.' От: '.$searchslu[$i]['login'].'</br>'.' Кому: '.$searchslu[$i]['list'].'</br>'.' Тема: '.$searchslu[$i]['topic']?></div>
                        <p><?=$searchslu[$i]['text'].'</br>'?></p>
                        <p></p>
                        <div>
                            <?php if (!isset($_GET['open']) || isset($_POST['sign']) || isset($_POST['redirect'])) { ?>
                                <form method="post" action="?open=<?=$searchslu[$i]['id']?>">
                                    <input type="hidden" name="scroll" value="">
                                    <input class="commit" type="submit" name="commit" value="Комментарий"/>
                                    <input class="commit" type="submit" name="sign" value="Подписать"/>
                                    <?php if ($_SESSION['login'] == $searchslu[$i]['who_change']) { ?>
                                        <input class="commit" type="submit" name="redirect" value="Направить"/>
                                        <select name="redirectList">
                                            <option value=""></option>
                                            <?php for ($i2 = 0; $i2 < count($userlist); $i2++) { ?>
                                                <option value="<?=$userlist[$i2]['login']?>"><?=$userlist[$i2]['login']?></option>
                                            <?php } ?>
                                        </select>
                                    <?php } ?>
                                    <p></p>
                                </form>
                            <?php }
                            else { ?>
                                <?php if ($searchslu[$i]['id'] == $openid) { ?>
                                <form name="commit" method="post" action="?">
                                <textarea name="text" required cols="60" rows="10" ></textarea>
                                    <p></p>
                                <input class="commit" type="submit" name="commit" value="Добавить комментарий"/>
                                    <input type="hidden" name="scroll" value="">
                                    <p></p>
                                </form>
                                <?php } ?>
                            <?php } ?>
                        </div>
                    </div>
                    <p></p>
                <?php }
            } ?>
        </div>
    </div>
</body>
</html>