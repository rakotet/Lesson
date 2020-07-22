<?php
// Авторизация пользователей это проверка "личности" пользователя через проверку логина и пароля

//echo md5('123'); хэш 123 равен 202cb962ac59075b964b07152d234b70
session_start(); // начинаем сессию пользователя
$error = false; // устанавливаем флаг ошибки
if (isset($_POST['auth'])) // проверяем была ли переданна форма
{
    $_SESSION['login'] = $_POST['login']; // открываем сессию записываем полученные из POST запроса переменные в сессию
    $_SESSION['password'] = md5($_POST['password']);
    $error = true;
}
if (isset($_GET['f']) && $_GET['f'] == 'logout') // проверяем есть ли GET запрос f и если он равен logout, то удаляем сесси логина и пароля
{
    unset($_SESSION['login']);
    unset($_SESSION['password']);
}
$login = 'admin';
$password = '202cb962ac59075b964b07152d234b70';
$auth = false;
$iss = isset($_SESSION['login']) && isset($_SESSION['password']);
if ($iss && $_SESSION['login'] === $login && $_SESSION['password'] === $password) { // если введенные в форму данные совпадают с $login и $password то true
    $auth = true;
    $error = false;
}

?>
<?php if ($error) { ?><p>Неверный логин или пароль!<p/><?php } ?>
<?php if ($auth) { ?>
    <p>
        Здравствуйте, <?=$login?>!
    </p>
    <a href="index.php?f=logout">Выход</a>
<?php } else { ?>
    <form name="auth" method="post" action="index.php">
        <div>
            Логин: <input type="text" name="login"/>
        </div>
        <div>
            Пароль: <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" name="auth" value="Войти"/>
        </div>
    </form>
<?php } ?>


