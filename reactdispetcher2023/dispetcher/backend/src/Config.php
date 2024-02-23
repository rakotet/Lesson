<?php
  ini_set('error_reporting', E_ALL); 
  ini_set('display_errors', 1); 

  session_start();

  define('DB_HOST', '127.0.0.1');
  define('DB_USER', 'root'); 
  //define('DB_USER', 'logistics'); 
  define('DB_PASSWORD', ''); 
  //define('DB_PASSWORD', 'bH5hD9bK7vuD1h'); 
  define('DB_NAME', 'disp'); 
  //define('DB_NAME', 'logistics'); 
  define('DB_PORT', '3306'); 
  define('DB_PREFIX', 'lib_'); 

  define('SECRET', 'aDr71Jfu8'); 

  define('DATE_FORMAT', 'd.m.Y H:i:s'); 
  define('DURATION_RENT', 86400 * 14); 

  define('USER', 0); 
  define('ADMIN', 1);

  set_include_path(get_include_path().PATH_SEPARATOR.'src'); 
  spl_autoload_register(); 
?>