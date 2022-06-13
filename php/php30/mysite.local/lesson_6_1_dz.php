<?php
  $age = 31;

  if($age < 40) echo 'Вам меньше 40 лет <br />';
  elseif($age > 40) echo 'Вам больше 40 лет <br />';
  else echo 'Вам 40 лет <br />';

  $a = 2;
  $b = 3;

  $a = $_GET['a'] ?? false;
  $b = $_GET['b'] ?? false;

  if (is_numeric($a) && is_numeric($b)) echo "Сумма а + b = ".($a + $b);
  elseif (is_string($a) && is_string($b)) echo 'Ожидались цифры, а полученны строки';
?>

<?php if(!($a && $b)) { ?>
  <div>
    <a href="?a=1&b=2">Сложить</a>
    <a href="?a=asas&b=23fgf">Строки</a>
  </div>
<?php } ?>
