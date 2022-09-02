<?php
   require_once "src/Config.php";
   
   function to404() {
     header('Location: 404.php');
     exit;
    }

    function to403() {
      header('Location: 403.php');
      exit;
     }
    
    $db = Database::getDBO();
    $request = new Request();
    require_once "src/Auth.php";

?>