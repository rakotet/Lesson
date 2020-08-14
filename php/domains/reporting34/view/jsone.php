<?php
require_once '../core/autch_class.php';

if (isset($_POST['func']) && $_POST['func'] == '1') {
    try {
        $pdo = new DataBase();
        $pdo->connect();
        $query = 'SELECT * FROM `secret_user` ORDER BY rand() LIMIT 1';
        $result = $pdo->bd->query($query);
        $row = $result->fetch(PDO::FETCH_ASSOC);
        echo json_encode($row);
    } catch(PDOException $e) {
        echo 'Ошибка: '.$e->getMessage();
    }
}
?>