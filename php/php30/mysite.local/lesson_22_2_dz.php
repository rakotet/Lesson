<?php
  if(isset($_GET['size'])) $size = $_GET['size'];
  // print_r($_POST);
  $text = $_POST['text'] ?? false;

  if($text) {
    $text = mb_str_split($text);
    $str = [];
    for($i = 0; $i < count($text); $i++) {
      if($i % 2 != 0) $str[] = $text[$i];
    }
    $str = implode($str);
  }


?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    p {
      font-size:<?=$size?>pt;
    }
  </style>
</head>
<body>
  <a href="?size=20">Крупный текст</a>&nbsp;
  <a href="?size=14">Нормальный текст</a>&nbsp;
  <a href="?size=8">Мелкий текст</a>&nbsp;
  <br/>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. dae </p>
  <p>Ipsum temporibus impedit perspiciatis officiis distinctio eligendi maxime dolores repellat beatae, repudian</p>
  <p>accusamus perferendis rem adipisci enim quaerat? Nemo eius unde hic?</p>
  <br/>
  <form action="" method="post">
    <textarea name="text"></textarea>
    <br/>
    <input type="submit" value="Отправить"/>
  </form>
  <br/>
  <?php if($text) { ?><p><?=$str?></p><?php } ?>
</body>
</html>
