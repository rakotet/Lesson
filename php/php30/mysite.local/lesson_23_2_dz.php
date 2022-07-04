<?php
  print_r($_POST);
  $text = $_POST['text'] ?? [];

  if($text) {
    $max = $text[0];
    for($i = 0; $i < count($text); $i++) {
      if($text[$i] > $max) $max = $text[$i];
    }

    $min = $max;

    for($j = 0; $j < count($text); $j++) {
      if($text[$j] < $min && $text[$j] != '') $min = $text[$j];
    }
  }

  $area = $_POST['area'] ?? '';
  $save = $_POST['save'] ?? false;
  $load = $_POST['load'] ?? false;
  $delete = $_POST['delete'] ?? false;
  $text = '';
  $del = false;

  define('FILE', 'lib/lesson_23_2_dz.txt');

  if($area && $save) {
    $area = htmlspecialchars($area);
    file_put_contents(FILE, $area);
  } 

  if($load && file_exists(FILE)) {
    $text = file_get_contents(FILE);
  } else {
    if($load) $text = true;
  }

  if($delete) {
    if(file_exists(FILE)) {
      unlink(FILE);
      $del = 1;
    }
    else $del = 2;
  }
?>
<form name="myform" action="" method="post">
  <input type="text" name="text[]">
  <br />
  <input type="text" name="text[]">
  <br />
  <input type="text" name="text[]">
  <br />
  <input type="text" name="text[]">
  <br />
  <input type="text" name="text[]">
  <br />
  <input type="submit" value="Отправить">
</form>
<?php if(isset($max) && $max != '') { ?>
  <p>Max: <?=$max?></p>
<?php } ?>
<?php if(isset($min) && $min != '') { ?>
  <p>Min: <?=$min?></p>
<?php } ?>
<br />

<?php if($save && $area) { ?>
  <p>Сохранение прошло успешно</p>
<?php } ?>
<?php if(is_bool($text)) { ?>
  <p>Файла не существует</p>
<?php } ?>
<?php if($del == 1) { ?>
  <p>Файл успешно удалён</p>
<?php } ?>
<?php if($del == 2) { ?>
  <p>Файл не существует</p>
<?php } ?>
<form name="myform_1" action="" method="post">
  <textarea name="area"><?php if(!is_bool($text)) echo $text ?></textarea>
  <br />
  <input name="save" type="submit" value="Сохранить">
  <input name="load" type="submit" value="Загрузить">
  <input name="delete" type="submit" value="Удалить">
</form>
