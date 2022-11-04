<?php
   require_once "Config.php";
   
   function to404() {
     header('Location: 404.php');
     exit;
    }

    function to403() {
      header('Location: 403.php');
      exit;
     }
    
    $header = 'header';
    $footer = 'footer';
  

    $db = Database::getDBO();
    $request = new Request();
    require_once "Auth.php";

?>