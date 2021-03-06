<?php
require_once 'constant_class.php';

class DataBase  {

    public $bd;

    public function connect() {
        try { // создаем объект подключения к базе
            $this->bd = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''] ); // 1 передаем драйвер базы с именем сервера, 2 название базы данных, 3 пользователь, 4 пароль, 5 включение отображение ошибок, кодировка
        } catch (PDOException $e) {
            echo 'Ошибка при подключении к базе данных!';
        }
    }

    public function searchLogin($login) {
        try {
            $query = 'SELECT `login` FROM `kul_users` WHERE `login` = ?';
            $query = $this->bd->prepare($query);
            $query->execute([$login]);
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchPassword($password) {
        try {
            $query = 'SELECT `password` FROM `kul_users` WHERE `password` = ?';
            $query = $this->bd->prepare($query);
            $query->execute([$password]);
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function chatMessageCreate($user, $text) {
        try {
            $query = "INSERT INTO `kul_chat` (`user`, `text`, `data`) 
                    VALUES ('$user', '$text', UNIX_TIMESTAMP())";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function usersList() {
        try {
            $query = 'SELECT `login`, `position` FROM `kul_users`';
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function privateMessage($fromUser, $toUser, $text, $date) {
        try {
            $user = $fromUser.','.$toUser;
            $user2 = $toUser.','.$fromUser;
            $query = "SELECT `message`, `last_message`, `id` FROM `kul_private_message` WHERE `users` = '$user' OR `users` = '$user2'";
            $query = $this->bd->query($query);
            $row = $query->fetch(PDO::FETCH_ASSOC);
            if($row) {
                $id = $row['id'];
                $roww = $row['message'];
                $message = "$roww</br><p>$fromUser $date</p><p>$text</p>";
                $query = "UPDATE `kul_private_message` SET `message` = '$message', `last_message` = '$text', `last_time` = UNIX_TIMESTAMP(), `last_user` = '$fromUser', `last_create` = '1', `no_message` = '0' WHERE `id` = '$id'";
                $this->bd->query($query);
            } else {
                $firstMessage = "<p>$fromUser $date</p><p>$text</p>";
                $users = $fromUser.','.$toUser;
                $query = "INSERT INTO `kul_private_message` (`users`, `message`, `last_message`, `last_time`, `last_user`, `last_create`, `no_message`) 
                VALUES ('$users', '$firstMessage', '$text', UNIX_TIMESTAMP(), '$fromUser', '1', '0')";
                $this->bd->query($query);
            }
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function loadingPrivateMessages($user) {
        try {
            $query = "SELECT `users`, `id`, `last_message`, `last_time`, `last_user`, `last_create`, `no_message`, `userTo`, `userTo2` FROM `kul_private_message` WHERE `users` LIKE '%$user%' ORDER BY `last_time` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function userPrivateMessageLoadingClient($id, $user, $userTo) {
        try {
            $query = "SELECT `userTo`, `userTo2` FROM `kul_private_message` WHERE `id` = '$id'";
            $query = $this->bd->query($query);
            $row = $query->fetch(PDO::FETCH_ASSOC);
            if($row['userTo'] == $userTo){
                $query = "UPDATE `kul_private_message` SET `last_user` = '$user', `last_create` = '0', `userTo2` = '$user', `no_message` = '1' WHERE `id` = '$id'";
            } else {
                $query = "UPDATE `kul_private_message` SET `last_user` = '$user', `last_create` = '0', `userTo` = '$user', `no_message` = '1' WHERE `id` = '$id'";
            }
            $this->bd->query($query);
            $query = "SELECT `message` FROM `kul_private_message` WHERE `id` = '$id'";
            $query = $this->bd->query($query);
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function updataUserTo($id, $user) {
        try {
            $query = "SELECT `userTo`, `userTo2` FROM `kul_private_message` WHERE `id` = '$id'";
            $query = $this->bd->query($query);
            $row = $query->fetch(PDO::FETCH_ASSOC);
            if($row['userTo'] == $user){
                $query = "UPDATE `kul_private_message` SET `userTo` = 'user' WHERE `id` = '$id'";
            } else {
                $query = "UPDATE `kul_private_message` SET `userTo2` = 'user' WHERE `id` = '$id'";
            }
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function closePrivateMessage($user) {
        try {
            $query = "UPDATE `kul_private_message` SET `userTo` = 'user' WHERE `userTo` = '$user'";
            $this->bd->query($query);
            $query = "UPDATE `kul_private_message` SET `userTo2` = 'user' WHERE `userTo2` = '$user'";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function correspondsWithMe($user, $select) {
        try {
            $query = "SELECT `id` FROM `kul_private_message` WHERE (`userTo` = '$user' OR `userTo2` = '$user') AND (`userTo` = '$select' OR `userTo2` = '$select')";
            $query = $this->bd->query($query);
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

















    public function users() {
        try {
            $query = 'SELECT `login` FROM `secret_user`';
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function handlerSlu($login, $list, $topic, $text) {
        try {
            $query = "INSERT INTO `secret_slujebka` (`login`, `list`, `topic`, `text`, `data_create`, `status`, `who_change`) 
                    VALUES ('$login', '$list', '$topic', '$text', CURRENT_DATE(), '0', '$login')";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluOne($login, $list, $data_create) {
        try {
            $query = "SELECT * FROM `secret_slujebka` 
                    WHERE `login` = '$login' OR `list` = '$list' OR `data_create` = '$data_create' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluLoginDate($login, $data_create) {
        try {
            $query = "SELECT * FROM `secret_slujebka` 
                    WHERE `login` = '$login' AND `data_create` = '$data_create' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluListDate($list, $data_create) {
        try {
            $query = "SELECT * FROM `secret_slujebka` 
                    WHERE `list` = '$list' AND `data_create` = '$data_create' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluLoginList($login, $list) {
        try {
            $query = "SELECT * FROM `secret_slujebka` 
                    WHERE `login` = '$login' AND `list` = '$list' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluLoginListDate($login, $list, $data_create) {
        try {
            $query = "SELECT * FROM `secret_slujebka` 
                    WHERE `login` = '$login' AND `list` = '$list' AND `data_create` = '$data_create' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluWork($status) {
        try {
            $query = "SELECT * FROM `secret_slujebka` WHERE `status` = '$status' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluLoginWork($login, $status) {
        try {
            $query = "SELECT * FROM `secret_slujebka` WHERE `login` = '$login' AND `status` = '$status' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function updateStatus($id, $status) {
        try {
            $query = "UPDATE `secret_slujebka` SET `status` = '$status' WHERE `id` = '$id'";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function updateText($id, $text, $login) {
        try {
            $query = "SELECT `text` FROM `secret_slujebka` WHERE `id` = '$id'";
            $result = $this->bd->query($query);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $text = $row['text'].'</br></br>'.'Комментарий от '.$login.': '.'</br>'.$text;
            $query = "UPDATE `secret_slujebka` SET `text` = '$text' WHERE `id` = '$id'";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function sign($id, $login) {
        try {
            $query = "SELECT `text` FROM `secret_slujebka` WHERE `id` = '$id'";
            $result = $this->bd->query($query);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $text = $row['text'].'</br></br>'.'<b>Подписано</b>: '.$login;
            $query = "UPDATE `secret_slujebka` SET `text` = '$text' WHERE `id` = '$id'";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchSluMneStatus($login, $status) {
        try {
            $query = "SELECT * FROM `secret_slujebka` WHERE `list` = '$login' AND `status` = '$status' ORDER BY `data_create` DESC";
            $query = $this->bd->query($query);
            $row = $query->fetchAll(PDO::FETCH_ASSOC);
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function redirect($id, $list) {
        try {
            $query = "UPDATE `secret_slujebka` SET `list` = '$list' WHERE `id` = '$id'";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchTopic($id) {
        try {
            $query = "SELECT `text` FROM `secret_slujebka` WHERE `id` = '$id'";
            $result = $this->bd->query($query);
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($row);
        } catch(PDOException $e) {
            echo 'Ошибка: '.$e->getMessage();
        }
    }
}