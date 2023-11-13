<?php
  require_once 'Config.php';

  require_once "lib/vendor/autoload.php"; 
  //use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\PHPMailer;

  function mailUser($topic, $htmlBody, $email) {
    $mail = new PHPMailer;
    $mail->CharSet = "utf-8";
    $mail->SMTPDebug = 3;
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "rakotet@gmail.com";
    $mail->Password = "ivcx hbxg clhx bypu";
    $mail->SMTPSecure = "tls";
    $mail->Port = 587;
    $mail->From = "rakotet@gmail.com";
    $mail->FromName = "Диспетчеризация";
    $mail->addAddress("$email", "");
    $mail->isHTML(true);
    $mail->Subject = "$topic";
    $mail->Body = "<b>$htmlBody</b>";
    $mail->AltBody = "Текстовая версия письма";
  
    if(!$mail->send()) {
      echo "Ошибка: " . $mail->ErrorInfo;
    }  else {
      echo "Сообщение успешно отправлено";
     }
  }

  class Database {

    private static $db;
    private $pdo;

    private function __construct() 
    {
      try {
        $this->pdo = new PDO('mysql:host='.DB_HOST.';port='.DB_PORT.';dbname='.DB_NAME, DB_USER, DB_PASSWORD); 
      } catch(PDOException $e) {
        echo 'Ошибка при подключении к базе данных: '.$e->getMessage();
      }
    }

    public static function getDBO() { 
      if(!self::$db) self::$db = new Database();
      return self::$db;
    }

    private function getTableName(string $table_name) : string {
      return '`'.DB_PREFIX.$table_name.'`';
    }

    ////////////////////////////////

    //////////////////////////////// Диспетчеризация

    //Вернуть даныне пользователя по его id
    public function getDataUser(string $table_name, string $where, array $values = []) : array { 
      $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    //Добавить предприятие
    public function addGroup(string $table_name, string $nameGroup , string $supervisor, string $divisions) {
      $sql = 'INSERT INTO '.$this->getTableName($table_name)." (`nameGroup`, `supervisor`, `divisions`) VALUES ('$nameGroup', '$supervisor', '$divisions')";
      $this->pdo->exec($sql);
    }

    //Добавить диспетчера
    public function addDisp(string $table_name, string $userName , string $jobTitle, string $telephone, string $userGroup, string $userSubdivision, string $login, string $password, string $email, string $type) {
      $sql = 'INSERT INTO '.$this->getTableName($table_name)." (`userName`, `jobTitle`, `telephone`, `userGroup`, `userSubdivision`, `login`, `password`, `email`, `type`) VALUES ('$userName', '$jobTitle', '$telephone', '$userGroup', '$userSubdivision', '$login', '$password', '$email', '$type')";
      $this->pdo->exec($sql);
    }

    //Вернуть все предприятия
    public function getGroup(string $table_name, array $values = []) : array{
      $sql = 'SELECT * FROM '.$this->getTableName($table_name);
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    //Вернуть всеx диспетчеров
    public function getDisp(string $table_name, string $where, array $values = []) : array{
      $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    //Вернуть число диспетчеров
    public function getDispNumber(string $table_name, string $where, array $values = []) : array{
      $sql = 'SELECT `id` FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    //Вернуть число предприятий
    public function getGroupNumber(string $table_name, array $values = []) : array{
      $sql = 'SELECT `id` FROM '.$this->getTableName($table_name);
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    //Обновить диспетчера
    public function updateDisp(string $table_name, array $values = []) {
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `email` = ?, `jobTitle` = ?, `telephone` = ?, `userGroup` = ?, `userName` = ?, `userSubdivision` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
    }

    //Удалить диспетчера
    public function trashDisp(string $table_name, string $where, array $values = []) {
      $sql = 'DELETE FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
    }

    //Добавить машину так же в предприятие и диспетчера
    public function addAuto(string $table_name, array $values = []) {
      $userGroup = $values['userGroup'];
      $userSubdivision = $values['userSubdivision'];
      $idDisp = $values['idDisp'];
      $marc = $values['marc'];
      $gossNumber = $values['gossNumber'];
      $yearOfIssue = (int) $values['yearOfIssue'];
      $view = $values['view'];
      $driver = $values['driver'];
      $telephone = (int) $values['telephone'];
      $status = $values['status'];

      $sql = 'INSERT INTO '.$this->getTableName($table_name)." (`autoGroup`, `autoSubdivision`, `idAddDisp`, `marc`, `gossNumber`, `yearOfIssue`, `view`, `driver`, `telephone`, `status`) VALUES ('$userGroup', '$userSubdivision', '$idDisp', '$marc', '$gossNumber', '$yearOfIssue', '$view', '$driver', '$telephone', '$status')";
      $this->pdo->exec($sql);

      $sql = 'SELECT `autoNumber`, `divisions` FROM `lib_group` WHERE `nameGroup` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$userGroup]);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      $result = $result[0];

      $autoNumber = ((int) $result['autoNumber']) + 1;
      $divisions = json_decode($result['divisions'], true);

      foreach ($divisions as $key => $value) {
        if($value['nameDivisions'] == $userSubdivision) {
          $divisions[$key]['autoNumber'] = $divisions[$key]['autoNumber'] + 1;
        }
      }

      $divisions = json_encode($divisions, JSON_UNESCAPED_UNICODE);

      $sql = 'UPDATE '.$this->getTableName('group').' SET `autoNumber` = ?, `divisions` = ? WHERE `nameGroup` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$autoNumber, $divisions, $userGroup]);
      
      $sql = 'SELECT `auto` FROM `lib_users` WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$idDisp]);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      $dispAuto = ((int) $result[0]['auto']) + 1;
      
      $sql = 'UPDATE '.$this->getTableName('users').' SET `auto` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$dispAuto, $idDisp]);
    }

    //Вернуть машины подразделения текущего диспетчера
    public function getAutoData(string $table_name, string $where, array $values = []) : array{
      $sql = 'SELECT `userSubdivision` FROM '.$this->getTableName('users')." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      $result = $result[0]['userSubdivision'];

      $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE `autoSubdivision` = ?";
      $query = $this->pdo->prepare($sql);
      $query->execute([$result]);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    //Обновить машину
    public function updateAuto(string $table_name, array $values = []) {
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `marc` = ?, `gossNumber` = ?, `yearOfIssue` = ?, `view` = ?, `driver` = ?, `telephone` = ?, `status` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
    }

    //Удалить машину
    public function trashAuto(string $table_name, string $where, array $values = []) {
      $sql = 'DELETE FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
    }

    //Добавить заявку от диспетчера
    public function addApplications(string $table_name, string $dateOfApplication , string $submissionTime, string $submissionAddress, string $arrivalAddress, string $rideWithAnticipation, string $comment, string $timeOfUseOfTransport, string $purposeOfTheTrip, string $applicationInitiator, string $jobTitle, string $subdivision, string $initiatorPhone, string $carClass, string $numberOfPassengers, string $namePassengers, string $passengersPhone, string $idDisp, string $dateOfCreation, string $emailUserCreate) {
      $sql = 'INSERT INTO '.$this->getTableName($table_name)." (`dateOfApplication`, `submissionTime`, `submissionAddress`, `arrivalAddress`, `rideWithAnticipation`, `comment`, `timeOfUseOfTransport`, `purposeOfTheTrip`, `applicationInitiator`, `jobTitle`, `subdivision`, `initiatorPhone`, `carClass`, `numberOfPassengers`, `namePassengers`, `passengersPhone`, `idDisp`, `dateOfCreation`, `emailUserCreate`) VALUES ('$dateOfApplication', '$submissionTime', '$submissionAddress', '$arrivalAddress', '$rideWithAnticipation', '$comment', '$timeOfUseOfTransport', '$purposeOfTheTrip', '$applicationInitiator', '$jobTitle', '$subdivision', '$initiatorPhone', '$carClass', '$numberOfPassengers', '$namePassengers', '$passengersPhone', '$idDisp', '$dateOfCreation', '$emailUserCreate')";
      $this->pdo->exec($sql);
    }

    //Вернуть заявки подразделения текущего диспетчера или пользователя
    public function getApplicationsData(string $table_name, string $where, array $values = []) : array{
      $sql = 'SELECT `userSubdivision` FROM '.$this->getTableName('users')." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      $result = $result[0]['userSubdivision'];

      $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE `subdivision` = ?";
      $query = $this->pdo->prepare($sql);
      $query->execute([$result]);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }

    //Вернуть заявки текущего  пользователя
    public function getMyApplicationsData(string $table_name, array $values = []) : array{
      $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE `idDisp` = ?";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if($result) return $result;
      return [];
    }


    //Обновить заявку от диспетчера
    public function updateApplications(string $table_name, array $values = []) {
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `dateOfApplication` = ?, `submissionTime` = ?, `submissionAddress` = ?, `arrivalAddress` = ?, `rideWithAnticipation` = ?, `comment` = ?, `timeOfUseOfTransport` = ?, `purposeOfTheTrip` = ?, `carClass` = ?, `numberOfPassengers` = ?, `namePassengers` = ?, `passengersPhone` = ?, `driverPhone` = ?, `marc` = ?, `gossNumber` = ?, `view` = ?, `status` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
    }


    //Вернуть время занятости авто
    public function theCarIsBusyAtThisTime(string $table_name, array $values = []) {
      $id = $values[0]['id'];
      $dateAssign = json_encode($values[0]['dateAssign']);
      $driverPhone = $values[0]['driverPhone'];
      $emailUserCreate = $values[0]['emailUserCreate'];
      $gossNumber = $values[0]['gossNumber'];
      $marc = $values[0]['marc'];
      $submissionTime = $values[0]['submissionTime'];
      $timeOfUseOfTransport = $values[0]['timeOfUseOfTransport'];

      mailUser('Вам назначено авто ', "<p>Вам назначено авто! Водидель - $driverPhone; $marc $gossNumber; c $submissionTime на $timeOfUseOfTransport:00 ч</p>", $emailUserCreate);

      $sql = 'SELECT * FROM '.$this->getTableName($table_name)." WHERE `id` = ?";
      $query = $this->pdo->prepare($sql);
      $query->execute([$id]);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      $result = $result[0];
      
      if($result['freeTime'] != null) {
        return $result;
        
      } else {
        $sql = 'UPDATE '.$this->getTableName($table_name).' SET `freeTime` = ? WHERE `id` = ?';
        $query = $this->pdo->prepare($sql);
        $query->execute([$dateAssign, $id]);
      }

    }

     //Отправить пользователю на почту назначенное авто
     public function mailToAutoUser(array $values = []) {
      $driverPhone = $values[0]['driverPhone'];
      $emailUserCreate = $values[0]['emailUserCreate'];
      $gossNumber = $values[0]['gossNumber'];
      $marc = $values[0]['marc'];
      $submissionTime = $values[0]['submissionTime'];
      $timeOfUseOfTransport = $values[0]['timeOfUseOfTransport'];

      mailUser('Вам назначено авто ', "<p>Вам назначено авто! Водидель - $driverPhone; $marc $gossNumber; c $submissionTime на $timeOfUseOfTransport:00 ч</p>", $emailUserCreate);
    }

    //Отправить пользователю на почту причину отмены заявки
    public function mailToCancel(array $values = []) {
      $mess = $values[0];
      $email = $values[3];

      mailUser('Ваша заявка отклонена ', "<p>Ваша заявка отклонена, по причине - $mess", $email);
    }


    //Обновить время занятости авто
    public function freeTime(string $table_name, array $values = []) {
      $id = $values[0];
      $obj = $values[1];

      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `freeTime` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([json_encode($obj), $id]);
    }

    //Удалить заявку
    public function trashApplications(string $table_name, string $where, array $values = []) {
      $sql = 'DELETE FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
    }

    //Вернуть занятое время авто
    public function trashApplicationsYes(string $table_name, string $where, array $values = []) {
      $sql = 'SELECT `freeTime` FROM '.$this->getTableName($table_name)." WHERE $where";
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      return $result[0]['freeTime'];
    }

    //Обновить время машины после удаления заявки
    public function trashApplicationsYesFreeTime(string $table_name, array $values = []) {
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `freeTime` = ? WHERE `gossNumber` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute($values);
    }

    //Отменить заявку
    public function cancelApplications(string $table_name, array $values = []) {
      $sql = 'UPDATE '.$this->getTableName($table_name).' SET `reasonForDeviation` = ?, `status` = ? WHERE `id` = ?';
      $query = $this->pdo->prepare($sql);
      $query->execute([$values[0], $values[1], $values[2]]);
    }




    ////////////////////////////////

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


    public function __destruct() // закрываем соединение с базой при удалении объекта подключения к базе из памяти
    {
      $this->pdo = null;
    }
  }

?>