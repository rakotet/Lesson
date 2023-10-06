<?php
  header("Access-Control-Allow-Origin: *");
  require_once "./Base.php";

  $dataFront = trim(file_get_contents("php://input"));
  $dataFront = json_decode($dataFront, true);
  
  //$auth_user = $db->getRowByWhere('users', '`login` = ? AND `password` = ?', ['admin', md5('12345aDr71Jfu8')]);

  if(isset($dataFront['userId'])) {
    echo json_encode($db->getDataUser('users', '`id` = ?', [$dataFront['userId']]));
  } 

  if(isset($dataFront['dataInputGroup'])) {
    echo json_encode($db->addGroup('group', $dataFront['dataInputGroup']['nameGroup'], $dataFront['dataInputGroup']['nameGroupSupervisor'], json_encode($dataFront['dataInputGroup']['divisions'], JSON_UNESCAPED_UNICODE)));
  }

  if(isset($dataFront['getGroupData'])) {
    echo json_encode($db->getaTable('group'));
  } 

  if(isset($dataFront['getDispData'])) {
    echo json_encode([]);
  } 


?>
