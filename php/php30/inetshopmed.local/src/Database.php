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