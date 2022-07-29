<?php
  $value = $_POST['select'] ?? false;

  if($value) {
    if($value == 1) header('Location: https://google.ru');
    elseif($value == 2) header('Location: https://vk.com');
    elseif($value == 3) header('Location: https://myrusakov.ru');
  }

  ////////////////////////////

  $big = 24;
  $normal = 16;
  $small = 12;
  $size = $_COOKIE['size'] ?? $normal;
  $sizeUser = $_GET['size'] ?? false;

  $fontSizeCookie = function(int $x) use(&$size) {
    $size = $x;
    setcookie('size', $x, time() + 300);
  };

  if($sizeUser) {
    if($sizeUser == 'big') $fontSizeCookie($big);
    elseif($sizeUser == 'normal') $fontSizeCookie($normal);
    elseif($sizeUser == 'small') $fontSizeCookie($small);
  }
?>

<form action="" name="myform" method="post">
  <select name="select">
    <option value="1">Google</option>
    <option value="2">VK</option>
    <option value="3">Сайт автора</option>
  </select>
  <input type="submit" value="Перейти на сайт">
</form>
<br/>
<a href="?size=big" style="font-size: <?=$size?>;">Крупный текст</a>
<br/>
<a href="?size=normal" style="font-size: <?=$size?>;">Нормальный текст</a>
<br/>
<a href="?size=small" style="font-size: <?=$size?>;">Мелкий текст</a>