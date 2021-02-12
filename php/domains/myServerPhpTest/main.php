<?php
  require_once './corephp/autch_class.php';
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Главная</title>
  </head>
  <body>
    <div class="container-my">
        <div class="row">
            <div class="col header">
              <div>
                <a href="../index.php?f=logout">Выход</a>
              </div>
              <div><?=$_SESSION['login']?></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2 sidebar">
                <ul class="navigation">
                    <li>Чат</li>
                    <li>Служебки</li>
                    <li>Новости</li>
                </ul>
            </div>
            <div class="col-md-10 content">
                <div>
                    
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="scriptjs/bootstrap.min.js"></script>
    <script>
    </script>
  </body>
</html>