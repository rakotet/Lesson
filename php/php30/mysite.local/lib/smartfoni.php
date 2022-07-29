<?php
  $array = explode("\n", file_get_contents('n.txt'));
  $reg = '/^[а-яё]{1} [0-9]{3} [а-яё]{2} [0-9]{2,3}/iu';
  $reg1 = '/[а-яё]{5,} .+$/iu';
  
  // foreach($array as $str) {
  //   if($str == '') continue;
  //   preg_match($reg, $str, $matches);
  //   echo $matches[0].'<br />';
  // }
  
  foreach($array as $str) {
    if($str == '') continue;
    preg_match($reg1, $str, $matches);
    
    echo $matches[0].'<br />';
  }
  

  
?>