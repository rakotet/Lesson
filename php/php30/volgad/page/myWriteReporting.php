<?php
  require_once "../src/Base.php";

  $title = 'Мои';

  $strFiles = [];

  if($auth_user) {
    $content = '../html/content';
    $contentRight = '../html/myWriteReporting';

    //$strFiles = json_decode($strFiles, true);

    if(isset($request->idmemo) && is_numeric($request->idmemo)) {
      $db->setSingMemo('memo', [$request->idmemo, $auth_user[0]['id']]);
      header('Location: /page/myWriteReporting');
    }

    if(isset($request->removeDoc) && is_numeric($request->memoId)) { // удаление файла
      unlink($request->removeDoc);
      $db->removeDocMemo('memo', [$request->memoId, $request->removeDoc]);
      header('Location: /page/myWriteReporting');
    }

    if(isset($request->writeReporting)) {
      if(isset($_FILES['upload_files'])) {
        $dirName = '../file/'.date('d_m_Y', time()).'_id'.$auth_user[0]['id'].'_idmemo'.$request->idMemoMyWriteReporting;
        if(!file_exists($dirName)) {
          mkdir($dirName);
        }
  
        foreach($_FILES['upload_files']['error'] as $key => $error) {
          if($error == 0) {
            $dist = $dirName.'/'.$_FILES['upload_files']['name'][$key];
            $success_multi = move_uploaded_file($_FILES['upload_files']['tmp_name'][$key], $dist);
            $strFiles[] = $dist;
          }
        }
      }
  
      $strFiles = array_unique($strFiles);
      
      $db->setDirMemo('memo', [$request->idMemoMyWriteReporting, $strFiles]);
    }

    function getMemoType(int $type) : string{
      if($type == 1) return 'Служебная записка';
      if($type == 2) return 'Приказ';
      if($type == 3) return 'Договор';
    }

    
    $getMemoUserStatusWork = $db->getMemoAllWork('memo');
    $getMemoUser = [];
    $printSign = false;

    foreach($getMemoUserStatusWork as $itemMemo) { // Записуем в массив только те служебки в которых есть согласующий текущий авторизованный пользователь
      $itemMemoArr = json_decode($itemMemo['signature'], true); 
      foreach($itemMemoArr as $signArr) {
        if($signArr[0] == $auth_user[0]['id']) {
          $getMemoUser[] = $itemMemo;
        }
      }
    }

    $nameAndDepartamentUser = function($id, $name = false) use($db) {
      $arrNameAndDepartament = $db->nameAndDepartamentUserToId('users', [$id]);
      if($name) return $arrNameAndDepartament[0]['name'];
      return $arrNameAndDepartament[0]['department'].' '.$arrNameAndDepartament[0]['name'];
    };

    function nameFile($file) {
      $file = explode("/", $file);
      return $file[3];
    }

  } else {
    header('Location: /');
  }
  
  
  

  require_once "../html/main.php";
?>