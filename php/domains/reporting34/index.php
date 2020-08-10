<?php
require_once 'core/route.php';

?>
<!DOCTYPE html>
<html lang='ru'>
<head>
    <title>Главная страница</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="Войдите" />
    <meta name="keywords" content="Главная страница" />
</head>
<body>
    <div>
        <?php if ($error) { ?>
            <p>Неверный логин или пароль!</p>
        <?php } ?>
        <form name="auth" method="post" action="index.php">
            <div>
                <div>Логин</div>
                <div><input type="text" name="login"/></div>
            </div>
            <div>
                <div>Пароль</div>
                 <div><input type="password" name="password"/></div>
            </div>
            <div><input type="submit" name="auth" value="Войти"/></div>
        </form>
    </div>
</body>
</html>