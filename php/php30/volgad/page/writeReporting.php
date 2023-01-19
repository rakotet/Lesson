<?php
  require_once "../src/Base.php";

  $title = 'Написать';

  if($auth_user) {
    $content = '../html/content';
    $contentRight = '../html/writeReporting';

    $arrayUsers = $db->getUsers('users');

    if(isset($request->writeReporting)) {
      // print_r($request);

      $dateMemo = time();
      $userId = $auth_user[0]['id'];
      $temaMemo = $request->tema;
      $typeMemo = $request->typeMemo;
      $strFiles = [];
      $users_sign = $request->users_sign;

      $success_on = false;
      $success_multi = false;

      // для одного файла(сейчас не используется)
      if(isset($_FILES['upload_file']) && $_FILES['upload_file']['error'] == 0) {
        $dirName = '../file/'.date('d_m_Y', time()).'_id'.$auth_user[0]['id'];
        if(!file_exists($dirName)) {
          mkdir($dirName);
        }

        $dist = $dirName.'/'.$_FILES['upload_file']['name']; // путь куда хотим перенести файл
        $success_on = move_uploaded_file($_FILES['upload_file']['tmp_name'], $dist); // ф-я переносит файл в указанную директорию из временной директории php (возвращает true или false)
      }

      // для добавления любого количества файлов
      if(isset($_FILES['upload_files'])) {
        $dirName = '../file/'.date('d_m_Y', time()).'_id'.$auth_user[0]['id'];
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
      $users_sign = array_unique($users_sign);

      foreach($users_sign as $s) {
        if($s == $auth_user[0]['id']) {
          $users_sign_arr[] = [$s, 1];
        } else $users_sign_arr[] = [$s, 0];
        
      }

      $users_sign = $users_sign_arr;

      $strFiles = json_encode($strFiles, JSON_UNESCAPED_UNICODE);
      $users_sign = json_encode($users_sign);

      $db->writeMemo('memo', $dateMemo, $userId, $temaMemo, $strFiles, $users_sign, (int) $typeMemo);
      header('Location: /page/myWriteReporting');

    }
  } else {
    header('Location: /');
  }
  
  
  

  require_once "../html/main.php";
?>