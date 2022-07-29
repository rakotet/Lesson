<?php
  define('DIST_MUSIC', 'lib/music/');
  $dir = scandir(DIST_MUSIC);
  $file = $_FILES['audio'] ?? false;
  $upload = false;
  $error = '';

  if($file && $file['error'] == 0) {
    if(!(str_ends_with($file['name'], '.mp3'))) $error = 'Не верный тип файла';
    if(!$error) {
      $dist = DIST_MUSIC.$file['name'];
      if(move_uploaded_file($file['tmp_name'], $dist)) {
        $upload = true;
        //header("Refresh: 0"); // перезагружает страницу
      }
      else $error = 'Ошибка загрузки файла';
    }
  }
?>
<?php foreach($dir as $name) { if($name == '.' || $name == '..') continue; ?>
  <audio controls>
    <source src="<?=DIST_MUSIC.$name?>"/>
  </audio> 
  <br />
<?php } ?>

<form name="form" action="" method="post" enctype="multipart/form-data">
  <?php if($error) { ?>
    <p style="color: red;"><?=$error?></p>
  <?php } elseif ($upload) { ?>
    <p style="color: green;">Файл успешно загружен</p>
  <?php } ?>
  <p>
    <input type="file" name="audio" />
  </p>
  <p>
    <input type="submit" value="Загрузить" />
  </p>
</form>