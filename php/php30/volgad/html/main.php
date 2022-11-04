<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link type="text/css" rel="stylesheet" href="../css/index.css?<?php echo time(); ?>" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&amp;display=swap?<?php echo time(); ?>" rel="stylesheet">
  <link rel="icon" type="image/png" href="/image/favicon.png">
  <link rel="apple-touch-icon" href="/image/favicon.png">
  <title><?=$title?></title>
</head>
<body>
  <div id="container">
    <div class="container-header">
      <header>
        <div id="header">
          <?php require_once "$header.php"?>
        </div>
      </header>
    </div>
    <div id="content">
      <?php require_once "$content.php"?>
    </div>
    <footer>
      <div id="footer">
        <?php require_once "$footer.php"?>
      </div>
    </footer>
  </div>
</body>
</html>