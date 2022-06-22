<?php
  $str = 'Я прохожу курс по PHP, и мне очень нравится PHP, а также сам курс по PHP';

  echo strlen($str).'<br />';
  
  echo str_replace('PHP', '<b>PHP</b>', $str);
?>