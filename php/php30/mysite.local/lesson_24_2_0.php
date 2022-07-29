<?php
  define('MAX_SIZE', 1024 * 1000);
  $file = $_FILES['img'] ?? false;
  $error = '';

  if($file && $file['error'] == 0) {
    print_r($file);
    $blacklist = ['.php', '.php3','.php4','.phtml','.html','.htm']; // список запрещенных расширений файла
    foreach($blacklist as $ext) {
      if(str_ends_with($file['name'], $ext)) $error = 'Расширение файла не подходит';
    }

    if(!$error) {
      $type = getimagesize($file['tmp_name']); // ф-я возвращает false если переданно не изображение
      $allowed_types = ['image/jpg', 'image/jpeg', 'image/png',]; // список разрешонных расширений файла
      print_r($type);
      if($type && in_array($type['mime'], $allowed_types)) { // is_array вернет true если переданный элемент (1 арг) есть в массиве (2 арг) иначе false
        if($file['size'] <= MAX_SIZE) {
          $dist = 'lib/fileslesson2410/'.$file['name'];
          if(move_uploaded_file($file['tmp_name'], $dist)) {
            $link = 'http://'.$_SERVER['HTTP_HOST'].'/'.$dist;
          }
          else $error = 'Ошибка при загрузке файла';
        }
        else $error = 'Размер файла превышен';
      }
      else $error = 'Тип файла не подходит';
    }
  }
?>
<form name="upload" action="" method="post" enctype="multipart/form-data">
  <?php if($error) { ?>
    <p style="color: #c00;"><?=$error?></p>
  <?php } elseif(isset($link)) { ?>
    <p style="color: #0c0;">Изображение успешно загруженно: <a href="<?=$link?>"><?=$link?></a></p>
  <?php } ?>
  <p>
    <input type="file" name="img"/>
  </p>
  <p>
    <input type="submit" value="Загрузить файл">
  </p>
</form>