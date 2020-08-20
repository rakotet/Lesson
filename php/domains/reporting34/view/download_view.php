<?php
require_once '../core/autch_class.php';

$y = false;
$n1 = false;
$n2 = false;
$n3 = false;
$n4 = false;
$date = new DateTime();
$d = $date->format('d_m_Y');

if (isset($_POST['download'])) {
    $blacklist = ['.php', '.phtml', '.php3', '.php4', '.html', '.htm'];
    foreach ($blacklist as $item) {
        if (preg_match("/$item$/", $_FILES['im']['name'])) {
            $n4 = true;
        }
    }

    $info = new SplFileInfo($_FILES['im']['name']);
    $in = $info->getExtension(); // получаем разширение загруженного файла

    if ($in == 'png' || $in == 'jpg' || $in == 'jpeg' || $in == 'pdf') {
        if ($_FILES['im']['size'] < 1024 * 10000) {
            $upload = '../download/'.$_FILES['im']['name'];
            if (move_uploaded_file($_FILES['im']['tmp_name'], $upload)) {
                exec("convert $upload -strip -quality 20 $upload");
                rename($upload, '../download/'.$_POST['customer'].'_'.$_POST['driver'].'_'.$_SESSION['login'].'_'.$d.'.'."$in");
                $y = true;
            }
            else $n1 = true;

        }
        else {
            $n2 = true;
        }
    }
    else {
        $n3 = true;
    }
}

?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Загрузить файл</title>
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
    <h3>Загрузить файл</h3>
    <div>
        <form name="download" method="post" action="" enctype="multipart/form-data">
            <div class="form">
                <?php if ($y) { ?>
                    <div><b style="color: #00cc00;"><?='Файл успешно загружен!'?></b></div>
                <?php } ?>
                <?php if ($n1) { ?>
                    <div><b style="color: #cc0000"><?='Ошибка при загрузке файла'?></b></div>
                <?php } ?>
                <?php if ($n2) { ?>
                    <div><b style="color: #cc0000"><?='Размер файла превышен!'?></b></div>
                <?php } ?>
                <?php if ($n3) { ?>
                    <div><b style="color: #cc0000"><?='Тип файла не подходит'?></b></div>
                <?php } ?>
                <?php if ($n4) { ?>
                    <div><b style="color: #cc0000"><?='Расширение файла не подходит'?></b></div>
                <?php } ?>
                <div>От кого</div>
                <div><input type="text" name="login" value="<?=$_SESSION['login']?>" disabled/></div>
                <div>Контрагент</div>
                <div><input type="text" name="customer" required></div>
                <div>Водитель</div>
                <div><input type="text" name="driver" required></div>
                <div><input type="file" name="im" /></div>
                <div><input type="submit" name="download" value="Загрузить"/></div>
            </div>
        </form>
        <div class="look">
            <div style="border: 1px solid #000;display: flex;align-items: center;justify-content: center;flex-direction: column;">
            <p></p>
            <a href="?p=1" style="color: #976315;">Посмотреть файлы</a>
            <br>
            <?php if (isset($_GET['p']) && $_GET['p'] == '1') { ?>
                <div>
                    <?php $dir = dir('../download/');
                        while (($file = $dir->read()) !== false) {
                            if ($file == '.' || $file == '..') continue; ?>
                            <a href="?p=1&o=<?=$file?>"><?=$file.'</br>'?></a>
                            <?php if (isset($_GET['o']) && $_GET['o'] == $file) { ?>
                                <img src="../download/<?=$file?>" width=800 height=600><br>
                            <?php } ?>
                   <?php } ?>
                </div>
            <?php } ?>
            </div>
        </div>
    </div>
</div>
</body>
</html>