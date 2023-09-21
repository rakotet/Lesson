<?php
  require_once "../src/Base.php";

  if(!$auth_user) {
    header('Location: /');
  } 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>App</title>
    <link type="image/png" sizes="16x16" rel="icon" href="../image/icons8-favicon-16.png">
    <script defer src="main.js"></script><link href="main.css" rel="stylesheet"></head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="user" style="display: none;"><?php echo $auth_user[0]['id'] ?></div>
    <div id="root"></div>
   
  </body>
</html>
