<?php
  print_r($_FILES);
  $success_on = false;
  $success_multi = false;

  if(isset($_FILES['upload_file']) && $_FILES['upload_file']['error'] == 0) {
    $dist = 'lib/fileslesson2410/'.$_FILES['upload_file']['name']; // путь куда хотим перенести файл
    $success_on = move_uploaded_file($_FILES['upload_file']['tmp_name'], $dist); // ф-я переносит файл в указанную директорию из временной директории php (возвращает true или false)
  }

  if(isset($_FILES['upload_files'])) {
    foreach($_FILES['upload_files']['error'] as $key => $error) {
      echo '<br/>'.$key.'<br/>';
      if($error == 0) {
        $dist = 'lib/fileslesson2410/'.$_FILES['upload_files']['name'][$key];
        $success_multi = move_uploaded_file($_FILES['upload_files']['tmp_name'][$key], $dist);
      }
    }
  }
?>
<form name="upload" action="" method="post" enctype="multipart/form-data"> <!-- enctype="multipart/form-data" - параметр что бы форма могла отправлять файлы -->
  <h4>Загрузка одного файла:</h4>
  <?php if($success_on) { ?>
    <p style="color: #0c0;">Файл успешно загружен!</p>
  <?php } ?>
  <p>
    <input name="upload_file" type="file" />
  </p>
  <p>
    <input type="submit" value="Загрузить файл">
  </p>
</form>

<form name="upload_multi" action="" method="post" enctype="multipart/form-data"> 
  <h4>Загрузка нескольких файлов:</h4>
  <?php if($success_multi) { ?>
    <p style="color: #0c0;">Файлы успешно загружен!</p>
  <?php } ?>
  <p>
    <input name="upload_files[]" type="file" />
  </p>
  <p>
    <input name="upload_files[]" type="file" />
  </p>
  <p>
    <input name="upload_files[]" type="file" />
  </p>
  <p>
    <input type="submit" value="Загрузить файлы">
  </p>
</form>