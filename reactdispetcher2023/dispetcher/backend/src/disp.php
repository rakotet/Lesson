<?php
  header("Access-Control-Allow-Origin: *");
  require_once "./Base.php";

  $content = trim(file_get_contents("php://input"));
  $content = json_decode($content, true);
  
  //$auth_user = $db->getRowByWhere('users', '`login` = ? AND `password` = ?', ['admin', md5('12345aDr71Jfu8')]);

  if(isset($content['userData'])) {
      echo json_encode($db->getRowByWhere('users', '`id` = ?', [$content['userData']]));
    } 
  

  


?>
