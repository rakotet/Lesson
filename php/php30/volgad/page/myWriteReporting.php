<?php
  require_once "../src/Base.php";

  $title = 'Мои';

  $strFiles = [];

  if($auth_user) {
    $content = '../html/content';
    $contentRight = '../html/myWriteReporting';

    //$strFiles = json_decode($strFiles, true);

    $arrayUsers = $db->getUsers('users');

    $getNameToId = function($id) use($arrayUsers) {
      foreach($arrayUsers as $user) {
        if($user['id'] == $id) return $user['department'].' '.$user['name'];
      }
    };

    if(isset($request->test)) {
      //echo md5('0907');
      //$db->usersSet('memo', [74, 0]);
      //header('Location: /page/myWriteReporting');
    }

    if(isset($request->addSing)) { // Добавить согласующего
      $addSignArr = explode("_", $request->addSing);
      $db->addSignMemo('memo', [$addSignArr[0], $addSignArr[1]]);
    }

    if(isset($request->deleteSign)) { // Удалить согласующего
      $deleteSignArr = explode("_", $request->deleteSign);
      $db->deleteSignMemo('memo', [$deleteSignArr[0], $deleteSignArr[1]]);
      header('Location: /page/myWriteReporting');
    }

    if(isset($request->textComment) && isset($request->idMemoComment)) { // добавить коммент к документу
      $db->setCommentMemo('memo', [(int) $request->idMemoComment, $request->textComment, $getNameToId($auth_user[0]['id'])]);
      header('Location: /page/myWriteReporting');
    }

    if(isset($request->backId)) {
      $db->setStatusMemo('memo', [$request->backId, 1]);
      header('Location: /page/myWriteReporting');
    }

    if(isset($request->endId)) {
      $db->setStatusMemo('memo', [$request->endId, 4]);
      header('Location: /page/myWriteReporting');
    }

    if(isset($request->users_executor)) { // Назначить или сменить исполнителя 
      $arrMemoExecutor = $request->users_executor;
      $arrMemoExecutor = explode("_", $arrMemoExecutor[0]);
      $db->setMemoExecutor('memo', [$arrMemoExecutor[0], $arrMemoExecutor[1]]);
    }

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
            $dist = $dirName.'/'.date('H_m_s', time()).'_'.$_FILES['upload_files']['name'][$key];
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

    if(isset($request->search)) { // получить завершенные документы
      $getMemoUserStatusWork = $db->getMemoAllWork('memo', [], true);
      //header('Location: /page/myWriteReporting');
    }

    foreach($getMemoUserStatusWork as $itemMemo) { // Записуем в массив служебки со статусом 2, Записуем в массив только те служебки в которых есть согласующий текущий авторизованный пользователь
      if($auth_user[0]['type'] == 0) {
        $itemMemoArr = json_decode($itemMemo['signature'], true); 
        foreach($itemMemoArr as $signArr) {
          if($signArr[0] == $auth_user[0]['id']) {
            $getMemoUser[] = $itemMemo;
          }
        }
      } elseif ($auth_user[0]['type'] == 1) {
        if($itemMemo['status'] == 2 || $itemMemo['status'] == 3 || $itemMemo['status'] == 4) $getMemoUser[] = $itemMemo;
        $itemMemoArr = json_decode($itemMemo['signature'], true); 
        foreach($itemMemoArr as $signArr) {
          if($signArr[0] == $auth_user[0]['id'] && $itemMemo['status'] != 2 && $itemMemo['status'] != 3 && $itemMemo['status'] != 4) {
            $getMemoUser[] = $itemMemo;
          }
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