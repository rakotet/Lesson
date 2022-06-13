<?php
  $x = 5;
  if ($x < 15) echo 'x меньше 15';
  else echo 'x больше 15';
  echo '<br />';

  if ($x < 5) echo 'x меньше 5 <br />';
  elseif ($x > 5) echo 'x больше 5 <br />';
  else echo 'x равен 5 <br />';

  $a = 4;
  $b = 1;

  if(isset($_GET['op'])) $op = $_GET['op'];
  else $op = false;

  $op = isset($_GET['op']) ? $op = $_GET['op'] : false; // тернарный оператор, краткая запить if else

  $op = $_GET['op'] ?? false; // еще более краткая запись на существование переменной (если существует записываем значение, если нет то значение после ??)

  if ($op == 'add') {
    $summa = $a + $b;
    echo "$a + $b = $summa <br />";
  } elseif ($op == 'mult') {
    $mult = $a * $b;
    echo "$a + $b = $mult <br />";
  } elseif ($op) echo 'Неизвестная операция <br />';
  

  $z = 5;
?>


<?php if(!$op) { ?>
  <div>
    <a href="?op=add">Сложить</a>
    <a href="?op=mult">Умножить</a>
  </div>
<?php } else { ?>
  <p>Спасибо</p>
<?php } ?>
  
<!-- другая запись выведения php кода в html -->

<?php if($z > 0) : ?>
  <p>z</p>
  <p>больше 0</p>
<?php elseif ($z < 0) : ?>
  <p>z</p>
  <p>меньше 0</p>
<?php else : ?>
  <p>z</p>
  <p>равен 0</p>
<?php endif; ?>