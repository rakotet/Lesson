<?php
  $file = file_get_contents('../../../volgadActivnost/userNe.txt'); 
  $users = explode("\n", $file);
  // print_r($pieces);

  $arr = [[0, 0]];
  
  for($i = 0; $i < count($users); $i++) {
    $login = '';
    $pass = '';
    $countSpase = 0;
    $countTire = 0;

    $us = str_split($users[$i]);
    
    for($a = 0; $a < count($us); $a++) {
      if(is_numeric($us[$a])) $login .= $us[$a];

      if($a == 0) $pass .= $us[$a];

      if($us[$a] == ' ' && $countSpase < 2) {
        $pass .= $us[$a + 1];
        $countSpase++;

      } elseif ($us[$a] == '-') {
        $countTire++;
        if($countTire == 2) {
          $pass .= $us[$a + 1].$us[$a + 2].$us[$a + 3].$us[$a + 5].$us[$a + 6];
        }
      }
    }

    $arr[$i] = [$login, $pass];

  }

  //print_r($arr);

  $s = '';
  $c = 0;

  for($q = 0; $q < count($arr); $q++) {
    $c++;
    $l = $arr[$q][0];
    $p = $arr[$q][1];
    $s .= "['$l', '$p'], ";
  }

  echo $s;
?>