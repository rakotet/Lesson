<?php
require_once 'constant_class.php';

class DataBase  {

    public $bd;

    public function connect() {
        try { // создаем объект подключения к базе
            $this->bd = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]); // 1 передаем драйвер базы с именем сервера, 2 название базы данных, 3 пользователь, 4 пароль, 5 включение отображение ошибок
        } catch (PDOException $e) {
            echo 'Ошибка при подключении к базе данных!';
        }
    }

    public function searchLogin($login) {
        try {
            $query = 'SELECT `login` FROM `secret_user` WHERE `login` = ?';
            $query = $this->bd->prepare($query);
            $query->execute([$login]);
            $row = $query->fetch();
            return $row;
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }

    public function searchPassword($password) {
        try {
            $query = 'SELECT `password` FROM `secret_user` WHERE `password` = ?';
            $query = $this->bd->prepare($query);
            $query->execute([$password]);
            $row = $query->fetch();
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
                    VALUES ('$login', '$list', '$topic', '$text', UNIX_TIMESTAMP(), '0', '$login')";
            $this->bd->query($query);
        }catch (PDOException $e) {
            echo 'ошибка: '.$e->getMessage().'<br/>';
        }
    }
}