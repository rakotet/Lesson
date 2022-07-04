<?php
  print_r($_GET);

  $a = $_GET['a'] ?? false;
  $b = $_GET['b'] ?? false;
  $op = $_GET['op'] ?? false;

  if(is_numeric($a) && is_numeric($b) && $op !== false) {
    if($op == 'add') $result = $a + $b;
    elseif($op == 'mult') $result = $a * $b;
    else $result = 'Не известная операция';
  }


?>
<p>Примеры операций</p>
<ul>
  <li>
    <a href="?a=3&amp;b=7&amp;op=add">a=3&amp;b=7&amp;op=add</a>
  </li>
  <li>
    <a href="?a=3&amp;b=0&amp;op=mult">a=3&amp;b=0&amp;op=mult</a>
  </li>
  <li>
    <a href="?a=3&amp;b=7&amp;op=123">a=3&amp;b=7&amp;op=123</a>
  </li>
</ul>
<?php if(isset($result)) { ?>
  <p>Результат: <?= $result ?></p>
<?php } ?>