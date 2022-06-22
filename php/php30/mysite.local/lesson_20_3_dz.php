<?php
  function getRandomName($name = '') {
    $str = '';
    $r = mt_rand(0, 10);
    if($r > 0 && $r <= 5) $str .= mt_rand(0, 10).'a'.$r.mt_rand(0, 10).$name;
    else $str .= $r.mt_rand(0, 10).'a'.mt_rand(0, 10).$name;

    return $str;
  }

  $folder = 'lib/1';

  if(!file_exists('lib/1')) {
    mkdir('lib/1');
  }

  mkdir('lib/1/'.getRandomName());
  
  $files = scandir('lib/1');
  
  $handler = fopen('lib/1/'.$files[mt_rand(0, count($files) - 1)].'/'.getRandomName('.txt'), 'a');
  fclose($handler);

  function deleteDirectory($folder) {
    $files = scandir($folder);
    foreach($files as $file) {
      if($file == '.' || $file == '..') continue;
      $f = $folder.'/'.$file;
      if(is_dir($f)) deleteDirectory($f);
      else()
  
    }
  }

  

  deleteDirectory($folder);
?>