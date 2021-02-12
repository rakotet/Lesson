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

              <div class="row justify-content-between">
                <div class="col-1 a">
                  <span class="white login"><?=$_SESSION['login']?></span>
                </div>

                <div class="col-1">
                    <a href="../index.php?f=logout"><span class="white exit">Выход</span></a>
                </div>
              </div>

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

                <div class="row">
                  <div class="col">
                    <div class="chat">
                      <p>123</p>
                      
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <textarea cols="100" rows="10"></textarea>
                  </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="scriptjs/bootstrap.min.js"></script>
    <script src="scriptjs/index.js"></script>
  </body>
</html>