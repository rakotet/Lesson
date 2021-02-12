<?php
require_once 'corephp/route_class.php';

?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Главная страница</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link type="text/css" rel="stylesheet" media="all" href="css/index.css" />
</head>
<body>
    <div id="container">
        <div id="form">
        <?php if ($error) { ?>
            <div>Неверный логин или пароль!</div>
        <?php } ?>
        <form name="auth" method="post" action="index.php">
            <div class="center">
                <div>Логин</div>
                <div><input type="text" name="login"/></div>
                <div>Пароль</div>
                <div><input type="password" name="password"/></div>
                <div><input type="submit" name="auth" value="Войти"/></div>
            </div>
        </form>
        </div>
        <div id="top">
        </div>
    </div>
</body>
</html>