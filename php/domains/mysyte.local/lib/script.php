<?php
$x = $_POST['x']?? false;
$y = $_POST['y']?? false;
$x = htmlspecialchars($x);
$y = htmlspecialchars($y);
if (is_numeric($x) && is_numeric($y)) echo $x + $y;
else echo 'error';