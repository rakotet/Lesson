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
    if($dataFront['dataInputDisp']['userType'] == 'Диспетчер') {
      $dataFront['dataInputDisp']['userType'] = '2';
    } elseif($dataFront['dataInputDisp']['userType'] == 'Пользователь') {
      $dataFront['dataInputDisp']['userType'] = '3';
    }
    echo json_encode($db->addDisp('users', $dataFront['dataInputDisp']['userName'], $dataFront['dataInputDisp']['jobTitle'], $dataFront['dataInputDisp']['telephone'], $dataFront['dataInputDisp']['userGroup'], $dataFront['dataInputDisp']['userSubdivision'], $dataFront['dataInputDisp']['login'], md5($dataFront['dataInputDisp']['password'].SECRET), $dataFront['dataInputDisp']['email'], $dataFront['dataInputDisp']['userType']));
  }

  if(isset($dataFront['getGroupData'])) {
    echo json_encode($db->getGroup('group'));
  } 

  if(isset($dataFront['getDispData'])) {
    echo json_encode($db->getDisp('users', '`type` IN (?, ?)', [2, 3]));
  } 

  if(isset($dataFront['updateDisp'])) {
    echo json_encode($db->updateDisp('users', [$dataFront['updateDisp']['email'], $dataFront['updateDisp']['jobTitle'], $dataFront['updateDisp']['telephone'], $dataFront['updateDisp']['userGroup'], $dataFront['updateDisp']['userName'], $dataFront['updateDisp']['userSubdivision'], $dataFront['updateDisp']['id'], ]));
  } 

  if(isset($dataFront['getDispNumber'])) {
    echo json_encode($db->getDispNumber('users', '`type` IN (?, ?)', [2, 3]));
  } 

  if(isset($dataFront['getGroupNumber'])) {
    echo json_encode($db->getGroupNumber('group'));
  } 

  if(isset($dataFront['trashDisp'])) {
    echo json_encode($db->trashDisp('users', '`id` = ?', [$dataFront['trashDisp']]));
  } 

  if(isset($dataFront['getAutoData'])) {
    echo json_encode($db->getAutoData('auto', '`id` = ?', [$dataFront['getAutoData']]));
  } 

  if(isset($dataFront['dataInputAuto'])) {
    echo json_encode($db->addAuto('auto', ['userGroup' => $dataFront['dataInputAuto']['userGroup'], 'userSubdivision' => $dataFront['dataInputAuto']['userSubdivision'], 'idDisp' => $dataFront['dataInputAuto']['idDisp'], 'marc' => $dataFront['dataInputAuto']['marc'], 'gossNumber' => $dataFront['dataInputAuto']['gossNumber'], 'yearOfIssue' => $dataFront['dataInputAuto']['yearOfIssue'], 'view' => $dataFront['dataInputAuto']['view'], 'driver' => $dataFront['dataInputAuto']['driver'], 'telephone' => $dataFront['dataInputAuto']['telephone'], 'status' => $dataFront['dataInputAuto']['status'] ]));
  } 

  if(isset($dataFront['updateAuto'])) {
    echo json_encode($db->updateAuto('auto', [$dataFront['updateAuto']['marc'], $dataFront['updateAuto']['gossNumber'], $dataFront['updateAuto']['yearOfIssue'], $dataFront['updateAuto']['view'], $dataFront['updateAuto']['driver'], $dataFront['updateAuto']['telephone'], $dataFront['updateAuto']['status'], $dataFront['updateAuto']['id']]));
  } 

  if(isset($dataFront['trashAuto'])) {
    echo json_encode($db->trashAuto('auto', '`id` = ?', [$dataFront['trashAuto']]));
  } 

  if(isset($dataFront['getApplicationsData'])) {
    echo json_encode($db->getApplicationsData('applications', '`id` = ?', [$dataFront['getApplicationsData']]));
  } 

  if(isset($dataFront['getMyApplicationsData'])) {
    echo json_encode($db->getMyApplicationsData('applications', [$dataFront['getMyApplicationsData']]));
  } 

  if(isset($dataFront['dataInputApplications'])) {

    if(!isset($dataFront['dataInputApplications']['comment'])) $dataFront['dataInputApplications']['comment'] = '';
    if(!isset($dataFront['dataInputApplications']['namePassengers'])) $dataFront['dataInputApplications']['namePassengers'] = '';
    if(!isset($dataFront['dataInputApplications']['passengersPhone'])) $dataFront['dataInputApplications']['passengersPhone'] = '';

    echo json_encode($db->addApplications('applications', 
    $dataFront['dataInputApplications']['dateOfApplication'], 
    $dataFront['dataInputApplications']['submissionTime'], 
    $dataFront['dataInputApplications']['submissionAddress'], 
    $dataFront['dataInputApplications']['arrivalAddress'], 
    $dataFront['dataInputApplications']['rideWithAnticipation'], 
    $dataFront['dataInputApplications']['comment'], 
    $dataFront['dataInputApplications']['timeOfUseOfTransport'], 
    $dataFront['dataInputApplications']['purposeOfTheTrip'], 
    $dataFront['dataInputApplications']['applicationInitiator'], 
    $dataFront['dataInputApplications']['jobTitle'], 
    $dataFront['dataInputApplications']['subdivision'], 
    $dataFront['dataInputApplications']['initiatorPhone'],
     $dataFront['dataInputApplications']['carClass'], 
     $dataFront['dataInputApplications']['numberOfPassengers'], 
     $dataFront['dataInputApplications']['namePassengers'], 
     $dataFront['dataInputApplications']['passengersPhone'], 
     $dataFront['dataInputApplications']['idDisp'], 
     $dataFront['dataInputApplications']['dateOfCreation'],
     $dataFront['dataInputApplications']['emailUserCreate']));
  } 

  if(isset($dataFront['updateApplications'])) {

    if(!isset($dataFront['updateApplications']['comment'])) $dataFront['updateApplications']['comment'] = '';
    if(!isset($dataFront['updateApplications']['namePassengers'])) $dataFront['updateApplications']['namePassengers'] = '';
    if(!isset($dataFront['updateApplications']['passengersPhone'])) $dataFront['updateApplications']['passengersPhone'] = '';

    if(!isset($dataFront['updateApplications']['driverPhone'])) $dataFront['updateApplications']['driverPhone'] = null;
    if(!isset($dataFront['updateApplications']['marc'])) $dataFront['updateApplications']['marc'] = null;
    if(!isset($dataFront['updateApplications']['gossNumber'])) $dataFront['updateApplications']['gossNumber'] = null;
    if(!isset($dataFront['updateApplications']['view'])) $dataFront['updateApplications']['view'] = null;

    if((isset($dataFront['updateApplications']['driverPhone'])) && (isset($dataFront['updateApplications']['marc'])) && (isset($dataFront['updateApplications']['gossNumber'])) && (isset($dataFront['updateApplications']['view']))) {
      $dataFront['updateApplications']['status'] = 'Назначена';
    } else {
      $dataFront['updateApplications']['status'] = 'Новая';
    }

    echo json_encode($db->updateApplications('applications', 
    [$dataFront['updateApplications']['dateOfApplication'], 
    $dataFront['updateApplications']['submissionTime'], 
    $dataFront['updateApplications']['submissionAddress'], 
    $dataFront['updateApplications']['arrivalAddress'], 
    $dataFront['updateApplications']['rideWithAnticipation'], 
    $dataFront['updateApplications']['comment'], 
    $dataFront['updateApplications']['timeOfUseOfTransport'], 
    $dataFront['updateApplications']['purposeOfTheTrip'], 
    $dataFront['updateApplications']['carClass'], 
    $dataFront['updateApplications']['numberOfPassengers'], 
    $dataFront['updateApplications']['namePassengers'], 
    $dataFront['updateApplications']['passengersPhone'], 
    $dataFront['updateApplications']['driverPhone'], 
    $dataFront['updateApplications']['marc'], 
    $dataFront['updateApplications']['gossNumber'], 
    $dataFront['updateApplications']['view'], 
    $dataFront['updateApplications']['status'], 
    $dataFront['updateApplications']['id']]));
  } 

  if(isset($dataFront['getAssignACar'])) {
    echo json_encode($db->getAutoData('auto', '`id` = ?', [$dataFront['getAssignACar']]));
  } 

  if(isset($dataFront['theCarIsBusyAtThisTime'])) {
    echo json_encode($db->theCarIsBusyAtThisTime('auto', [$dataFront['theCarIsBusyAtThisTime']]));
  } 

  if(isset($dataFront['mailToAutoUser'])) {
    echo json_encode($db->mailToAutoUser([$dataFront['mailToAutoUser']]));
  } 

  if(isset($dataFront['freeTime'])) {
    echo json_encode($db->freeTime('auto', [$dataFront['freeTime'][0], $dataFront['freeTime'][1]]));
  } 

  if(isset($dataFront['trashApplications'])) {
    echo json_encode($db->trashApplications('applications', '`id` = ?', [$dataFront['trashApplications']]));
  } 

  if(isset($dataFront['trashApplicationsYes'])) {
    echo json_encode($db->trashApplicationsYes('auto', '`gossNumber` = ?', [$dataFront['trashApplicationsYes']]));
  } 

  if(isset($dataFront['trashApplicationsYesFreeTime'])) {
    echo json_encode($db->trashApplicationsYesFreeTime('auto', $dataFront['trashApplicationsYesFreeTime']));
  } 

  if(isset($dataFront['cancelApplications'])) {
    echo json_encode($db->cancelApplications('applications', $dataFront['cancelApplications']));
  } 

  if(isset($dataFront['mailToCancel'])) {
    echo json_encode($db->mailToCancel($dataFront['mailToCancel']));
  } 
?>
