<?php
  function getRandString() {
    $str = '';
    $counter = mt_rand(1, 5);
    
    for($i = 0; $i < $counter; $i++) {
      $str .= mt_rand(1, 5).' ';
    }

    return $str;
  }

  $file_1 = fopen('lib/1.txt', 'a+');
  $file_2 = fopen('lib/2.txt', 'a+');
  $file_3 = fopen('lib/3.txt', 'a+');
  
  file_put_contents('lib/1.txt', getRandString());
  file_put_contents('lib/2.txt', getRandString());
  file_put_contents('lib/3.txt', getRandString());

  fseek($file_1, 0);
  fseek($file_2, 0);
  fseek($file_3, 0);

  echo file_get_contents('lib/1.txt').'<br />';
  echo file_get_contents('lib/2.txt').'<br />';
  echo file_get_contents('lib/3.txt').'<br />';

  $summ = 0;

  while(!feof($file_1)) {
    $summ += (int) fread($file_1, 1);
  }

  while(!feof($file_2)) {
    $summ += (int) fread($file_2, 1);
  }

  while(!feof($file_3)) {
    $summ += (int) fread($file_3, 1);
  }

  echo $summ.'<br />';

  fclose($file_1);
  fclose($file_2);
  fclose($file_3);

  unlink('lib/1.txt');
  unlink('lib/2.txt');
  unlink('lib/3.txt');

  /////////

  $arr = parse_ini_file('lib/lesson_19_2_dz.ini', true, INI_SCANNER_TYPED);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DZ</title>
  <style>
    p {
      color:<?=$arr['Style']['color']?>;
      font-size:<?=$arr['Style']['size']?>;
    }
  </style>
</head>
<body>
  <p>12132334</p>
  <p>dfdg</p>
</body>
</html>