<?php
  echo "Ваш ip адрес - ".$_SERVER['REMOTE_ADDR']."<br />";
  echo "Ваш браузер - ".$_SERVER['HTTP_USER_AGENT']."<br />";

  require_once 'lib/15_2_dz.php';

  echo maxi([1, 11, -5, 10, 4, 8]).'<br />';
  echo mini([1, 11, -5, 10, 4, 8]).'<br />';
  echo summ([1, 11, -5, 10, 4, 8]).'<br />';
  echo sred([1, 11, -5, 10, 4, 8]).'<br />';
?>