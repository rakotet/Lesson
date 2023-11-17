<?php
  require_once "./Base.php";
  $str = '{"trashApplicationsYes":["33ва",{"17.11.2023":{"10:00":"11:00}"}}]}';

  $arr = json_decode($str, true);
  //print_r($arr);

  echo $db->trashApplicationsYes('auto', '`gossNumber` = ?', $arr['trashApplicationsYes']);
?>