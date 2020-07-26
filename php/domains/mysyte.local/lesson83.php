<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'mysite');

$mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_errno) exit('Ошибка соединения с БД');
$mysqli->set_charset('utf8');

// добавляем еще одного пользователя в таблицу sql запросом
/*$mysqli->query('INSERT INTO `secret_user`
(`id`, `name`, `email`, `password`, `balance`, `ip_reg`, `date_reg`)
VALUES (NULL, \'Вячеслав\', \'v1@mail.ru\', MD5(\'123\'), \'0.00\', INET_ATON(\'127.0.0.1\'), UNIX_TIMESTAMP());'); */

if (isset($_POST['reg'])) {
    $name = $mysqli->real_escape_string(htmlspecialchars($_POST['name'])); // дополнительная проверка данных введенных пользователем, защищающая от вражеского кода, преобразует строку в более безопастную строку и возвращает её
    $email = $mysqli->real_escape_string(htmlspecialchars($_POST['email']));
    $password = $mysqli->real_escape_string(htmlspecialchars($_POST['password']));
    $ip_reg = ip2long($_SERVER['REMOTE_ADDR']); // записываем ip адресс пользователя
    $query = "INSERT INTO `secret_user`
    (`name`, `email`, `password`, `ip_reg`, `date_reg`) 
    VALUES ('$name', '$email', MD5('$password'), '$ip_reg', UNIX_TIMESTAMP())";
    $result = $mysqli->query($query); // выполняем sql запрос и результат записываем в переменную
}

$mysqli->close();

// Простейшая форма регистрации пользователя (с записью в БД)
?>
<?php if (isset($result)) { ?>
    <?php if ($result) { ?>
        <p>Регистрация прошла успешно!</p>
    <?php } else { ?>
        <p>Ошибка при регистрации!</p>
    <?php } ?>
<?php } ?>

<form name='reg' action='index.php' method='post'>
    <p>
        Имя: <input type="text" name="name"/>
    </p>
    <p>
        E-mail: <input type="email" name="email"/>
    </p>
    <p>
        Пароль: <input type="password" name="password"/>
    </p>
    <p>
        <input type="submit" name="reg" value="зарегистрироваться"/>
    </p>
</form>
