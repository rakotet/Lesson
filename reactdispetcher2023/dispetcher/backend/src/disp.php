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

  if(isset($dataFront['dataInputDisp'])) {
    echo json_encode($db->addDisp('users', $dataFront['dataInputDisp']['userName'], $dataFront['dataInputDisp']['jobTitle'], $dataFront['dataInputDisp']['telephone'], $dataFront['dataInputDisp']['userGroup'], $dataFront['dataInputDisp']['userSubdivision'], $dataFront['dataInputDisp']['login'], md5($dataFront['dataInputDisp']['password'].SECRET), $dataFront['dataInputDisp']['email'], '2'));
  }

  if(isset($dataFront['getGroupData'])) {
    echo json_encode($db->getGroup('group'));
  } 

  if(isset($dataFront['getDispData'])) {
    echo json_encode($db->getDisp('users', '`type` = ?', [2]));
  } 

  if(isset($dataFront['updateDisp'])) {
    echo json_encode($db->updateDisp('users', [$dataFront['updateDisp']['email'], $dataFront['updateDisp']['jobTitle'], $dataFront['updateDisp']['telephone'], $dataFront['updateDisp']['userGroup'], $dataFront['updateDisp']['userName'], $dataFront['updateDisp']['userSubdivision'], $dataFront['updateDisp']['id'], ]));
  } 

  if(isset($dataFront['getDispNumber'])) {
    echo json_encode($db->getDispNumber('users', '`type` = ?', [2]));
  } 

  if(isset($dataFront['getGroupNumber'])) {
    echo json_encode($db->getGroupNumber('group'));
  } 

  if(isset($dataFront['trashDisp'])) {
    echo json_encode($db->trashDisp('users', '`id` = ?', [$dataFront['trashDisp']]));
  } 

  if(isset($dataFront['getAutoData'])) {
    echo json_encode(['AutoData']);
  } 

  if(isset($dataFront['dataInputAuto'])) {
    echo json_encode($db->addAuto('auto', ['userGroup' => $dataFront['dataInputAuto']['userGroup'], 'userSubdivision' => $dataFront['dataInputAuto']['userSubdivision']]));
  } 
?>
