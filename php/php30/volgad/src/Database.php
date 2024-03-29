<?php
  require_once 'Config.php';

  class Database {

    private static $db;
    private $pdo;

    private function __construct() // закрытый конструктор (паттерн программтрования сингелтон - одиночка) нужен для того что бы нельзя было создавать где угодно объекты этого класса через new, что бы не создавать лишних подключений к БД а использовать лишь один объект во всем проэкте
    {
      try {
        $this->pdo = new PDO('mysql:host='.DB_HOST.';port='.DB_PORT.';dbname='.DB_NAME, DB_USER, DB_PASSWORD); // создаём объект с подклчюение в нем к базе данных
      } catch(PDOException $e) {
        echo 'Ошибка при подключении к базе данных: '.$e->getMessage();
      }
    }

    public static function getDBO() { // вторая часть паттерна синглтон, создаём открытый статический метод в котором идет проверка на то был ли создан объект этого класса и возвращаем его, и уже через него работаем с БД имея лишь одно подключение к БД на все операции
      if(!self::$db) self::$db = new Database();
      return self::$db;
    }

    private function getTableName(string $table_name) : string {
      return '`'.DB_PREFIX.$table_name.'`';
    }

    ////////////////////////////////

    public function writeMemo(string $table_name, int $date, int $user_id, string $tema, string $text, string $signs, int $typeMemo) {
      $sql = 'INSERT INTO '.$this->getTableName($table_name)." (`date`, `id_user`, `tema`, `dir`, `signature`, `type_memo`) VALUES ('$date', '$user_id', '$tema', '$text', '$signs', '$typeMemo')";
      $this->pdo->exec($sql);
    }

    public function getMemoUser(string $table_name, array $values = []) : array {
      $sql = 'SELECT * FROM '.$this->getTableName($table_name). ' WHERE `id_user` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteSignMemo(string $table_name, array $values = []) : void { // удалить согласующего
      $sql = 'SELECT `signature` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[1]]);
      $query = $query->fetchAll(PDO::FETCH_ASSOC);
      $query = json_decode($query[0]['signature'], true);
      
      $arrSign = [];

      foreach($query as $sign) {
        if($sign[0] != $values[0]) $arrSign[] = $sign;
      }

      $arrSign = json_encode($arrSign);

      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `signature` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$arrSign, $values[1]]);
    }

    public function addSignMemo(string $table_name, array $values = []) : void { // добавить согласующего
      $sql = 'SELECT `signature` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[1]]);
      $query = $query->fetchAll(PDO::FETCH_ASSOC);
      $query = json_decode($query[0]['signature'], true);
      $add = true;

      foreach($query as $sign) {
        if($sign[0] == $values[0]) $add = false;
      }

      if($add) {
        $query[] = [$values[0], 0];

        $arrSign = json_encode($query);
  
        $sql = 'UPDATE '.$this->getTableName($table_name).' SET `signature` = ?, `status` = ? WHERE `id` = ?';
        $query = $this->pdo->prepare($sql);
        $query->execute([$arrSign, 1, $values[1]]);
      }
    }

    public function usersSet(string $table_name, array $values = []) : void {
      $sql = 'SELECT `comment` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[0]]);
      $query = $query->fetchAll(PDO::FETCH_ASSOC);
      $query = $query[0]['comment'];
      $query = explode(";", $query);
      
      for($i = 0; $i < count($query); $i++) {
        $arrUser = explode("\n", $query[$i]);

        if($i == 0) {
          $pass = random_int(0, 9).random_int(0, 9).random_int(0, 9).random_int(0, 9);
          file_put_contents('../file/pass.txt', file_get_contents('../file/pass.txt')."\n $arrUser[1] - $pass");
          $pass = md5($pass.SECRET);
          $sql = 'INSERT INTO '.$this->getTableName('users')." (`type`, `department`, `name`, `login`, `password`) VALUES ('0', '$arrUser[0]', '$arrUser[1]', '$arrUser[1]', '$pass')";
          $this->pdo->exec($sql);
        } elseif($i == 27) {
          $pass = random_int(0, 9).random_int(0, 9).random_int(0, 9).random_int(0, 9);
          file_put_contents('../file/pass.txt', file_get_contents('../file/pass.txt')."\n $arrUser[2] - $pass");
          $pass = md5($pass.SECRET);
          $sql = 'INSERT INTO '.$this->getTableName('users')." (`type`, `department`, `name`, `login`, `password`) VALUES ('0', '$arrUser[1]', '$arrUser[2]', '$arrUser[2]', '$pass')";
          $this->pdo->exec($sql);
        } else {
          $depart = $arrUser[1];
          for($q = 2; $q < count($arrUser); $q++) {
            if($arrUser[$q]) {
              $pass = random_int(0, 9).random_int(0, 9).random_int(0, 9).random_int(0, 9);
              file_put_contents('../file/pass.txt', file_get_contents('../file/pass.txt')."\n $arrUser[$q] - $pass");
              $pass = md5($pass.SECRET);
              $sql = 'INSERT INTO '.$this->getTableName('users')." (`type`, `department`, `name`, `login`, `password`) VALUES ('0', '$depart', '$arrUser[$q]', '$arrUser[$q]', '$pass')";
              $this->pdo->exec($sql);
            }
          }
        }
      }
    }

    public function setCommentMemo(string $table_name, array $values = []) : void { // добавить комментарий к документу
      $sql = 'SELECT `comment` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[0]]);
      $commit = $query->fetchAll(PDO::FETCH_ASSOC);
      $commit = $commit[0]['comment'];
      $commit = $commit == null ? '' : $commit;
      $commit .= '<p>'.$values[2].': '.$values[1].'</p></br>';

      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `comment` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$commit, $values[0]]);
    }

    public function removeDocMemo(string $table_name, array $values = []) : void {
      $sql = 'SELECT `dir` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[0]]);
      $query = $query->fetchAll(PDO::FETCH_ASSOC);
      $query = json_decode($query[0]['dir'], true);
      $dirArr = [];
      foreach($query as $itemDir) {
        if($itemDir != $values[1]) $dirArr[] = $itemDir;
      }

      $dirArr = json_encode($dirArr, JSON_UNESCAPED_UNICODE);

      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `dir` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$dirArr, $values[0]]);
    }

    public function setMemoExecutor(string $table_name, array $values = []) : void { // Назничить или изменить исполнителя
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `executor_id` = ?, `status` = ?, `ready` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[0], '3', 0, $values[1]]);
    }

    public function readyMemo(string $table_name, array $values = []) : void { // Исполнитель ставит 'Выполнено"
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `ready` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([1, $values[0]]);
    }

    public function setStatusMemo(string $table_name, array $values = []) : void { // Сменить статус служебки
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `status` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[1], $values[0]]);

      if($values[1] == 1) {
        $sql = 'SELECT `signature` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
        $query = $this->pdo->prepare($sql);
        $query->execute([$values[0]]);
        $query = $query->fetchAll(PDO::FETCH_ASSOC);
        $query = json_decode($query[0]['signature'], true);
        $arrSign = [];
  
        foreach($query as $sign) {
          $sign[1] = 0;
          $arrSign[] = $sign;
        }
  
        $arrSign = json_encode($arrSign);
  
        $sql = 'UPDATE '.$this->getTableName($table_name).' SET `signature` = ? WHERE `id` = ?';
        $query = $this->pdo->prepare($sql);
        $query->execute([$arrSign, $values[0]]);
      }
    }

    public function setDirMemo(string $table_name, array $values = []) : void {
      $sql = 'SELECT `dir` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[0]]);
      $query = $query->fetchAll(PDO::FETCH_ASSOC);
      $query = json_decode($query[0]['dir'], true);
      $dirArr = array_merge($query, $values[1]);
      
      $dirArr = json_encode($dirArr, JSON_UNESCAPED_UNICODE);

      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `dir` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$dirArr, $values[0]]);
    }

    public function setSingMemo(string $table_name, array $values = []) {
      $sql = 'SELECT `signature` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[0]]);
      $query = $query->fetchAll(PDO::FETCH_ASSOC);
      $query = json_decode($query[0]['signature'], true);
      $arrSign = [];

      foreach($query as $k => $v) {
        if($v[0] == ((int) $values[1])) {
          $arrSign[$k] = [$v[0], 1];
        } else {
          $arrSign[$k] = $v;
        }
      }

      $setStatus = true;

      foreach($arrSign as $key => $value) {
        if($value[1] == 0) $setStatus = false;
      }

      $arrSign = json_encode($arrSign);

      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `signature` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$arrSign, $values[0]]);

      if($setStatus) {
        $sql = 'UPDATE '.$this->getTableName($table_name).' SET `status` = ? WHERE `id` = ?';
        $query = $this->pdo->prepare($sql);
        $query->execute([2, $values[0]]);
      }
    }

    public function getMemoAllWork(string $table_name, array $values = [1, 2, 3], bool $search = false) : array {
      $sql = 'SELECT * FROM '.$this->getTableName($table_name). ' WHERE `status` IN (?, ?, ?) ORDER BY `date` DESC';
      if($search) $sql = 'SELECT * FROM '.$this->getTableName($table_name). ' WHERE `status` = ? ORDER BY `date` DESC';
      $query = $this->pdo->prepare($sql);
      if($search) $values = [4];
      $query->execute($values);
      return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUsers(string $table_name, array $values = []) : array {
      $sql = 'SELECT * FROM '.$this->getTableName($table_name).' ORDER BY `name`';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function nameAndDepartamentUserToId(string $table_name, array $values = []) : array {
      $sql = 'SELECT `name`, `department` FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function setRowCatalog(string $table_name, string $name, string $image, int $price) {
      $sql = 'INSERT INTO '.$this->getTableName($table_name)." (`name`, `image`, `price`) VALUES ('$name', '$image', '$price')";
      //$query = $this->pdo->prepare($sql);
      $this->pdo->exec($sql);
    }

    public function getCatalog(string $table_name, array $values = []) : array{
      $sql = 'SELECT * FROM '.$this->getTableName($table_name);
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      return $query->fetchAll(PDO::FETCH_ASSOC);

    }

    public function getProduct(string $table_name, array $values = []) : array {
      $sql = 'SELECT * FROM '.$this->getTableName($table_name). ' WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    ///////////////////////////////

    public function getCountRows(string $table_name, string $where = '', array $values = []) : int { // ф-я возвращает количество строк в таблице, можно указывать параметры выборки
      $sql = 'SELECT COUNT(`id`) as `count` FROM '.$this->getTableName($table_name);
      if($where) $sql .= " WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      return $query->fetchColumn();
    }

    public function getRows(string $table_name, string $where = '', array $values = [], string $order_by = '') : array {
      $sql = 'SELECT * FROM '.$this->getTableName($table_name);
      if($where) $sql .= " WHERE $where";
      if($order_by) $sql .= " ORDER BY `$order_by`";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getRowByWhere(string $table_name, string $where, array $values = []) : array {
      $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    public function getRowById(string $table_name, int $id) : array {
      return $this->getRowByWhere($table_name, '`id` = ?', [$id]);
    }

    public function getRowByIds(string $table_name, array $ids) : array {
      if($ids) {
        $in = str_repeat('?,', count($ids) - 1).'?'; // ф-я повторяет 1 арг количество раз 2 арг (действиями дальше убираем лишнюю , в конце)
        $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE `id` IN ($in)";
        $query = $this->pdo->prepare($sql);
        $query->execute($ids);
        $result = [];
        foreach($query->fetchAll(PDO::FETCH_ASSOC) as $row) {
          $result[$row['id']] = $row;
        }
  
        return $result;
      }
      return [];
    }

    public function update(string $table_name, array $fields, array $values, string $where = '', array $where_values = []) {
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET ';
      foreach($fields as $fild) {
        $sql .= "`$fild` = ?,";
      }

      $sql = substr($sql, 0, -1); // обрезаем последнюю лишнюю запятую в запросе
      if($where) $sql .= " WHERE $where";

      $query = $this->pdo->prepare($sql);
      $query->execute(array_merge($values, $where_values));
    }

    public function __destruct() // закрываем соединение с базой при удалении объекта подключения к базе из памяти
    {
      $this->pdo = null;
    }
  }

?>