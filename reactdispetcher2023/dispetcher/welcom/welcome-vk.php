<?php
   if ( $_SERVER['REQUEST_URI'] != strtolower( $_SERVER['REQUEST_URI']) ) {
       header('Location: //'.$_SERVER['HTTP_HOST'] . strtolower($_SERVER['REQUEST_URI']), true, 301);
       exit();
   }
   ?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="robots" content="noindex">
      <link href="./VGK/css/proxima-nova.css" rel="stylesheet">
      <link href="./VGK/css/bootstrap.min.css" rel="stylesheet">
      <link type="text/css" rel="stylesheet" href="./VGK/css/style.css" />
      <link
         rel="stylesheet"
         href="./VGK/css/fancybox.css"
         />
      <!--<link-->
      <!--   rel="stylesheet"-->
      <!--   href="./VGK/css/swiper-bundle.min.css"-->
      <!--   />-->
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
      <title>ВК</title>
   </head>
   <body>
      <!-- Шапка сайта -->
      <header>
         <?php include_once( 'VGK/header.php' ); ?>
      </header>
      <!-- Конец шапки сайта -->
      <!-- Табы -->
      <?php include_once( 'VGK/tabs.php' ); ?>
      <!-- Конец табов -->
      <!-- Футер -->
      <footer>
         <?php include_once( 'VGK/footer.php' ); ?>
      </footer>
      <!-- Вместо слова "наверх" можно использовать картинку img src="path" --> 
      <div id="button-up">
         <div style="font-weight:500;margin-top:40px;margin-left:-7px;">Наверх</div>
      </div>
      <!-- Конец футера -->
      <script src="./VGK/js/jquery-3.7.1.min.js"></script>
      <script src="./VGK/js/script.js"></script>
      <!--<script src="./VGK/js/swiper-bundle.min.js"></script>-->
      <script src="./VGK/js/fancybox.umd.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      <script>
         const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: {
               el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
               el: '.swiper-scrollbar',
            },

            autoHeight: true,

            autoplay: {
               delay: 3000
            },

         });
      </script>
           
      

   </body>
</html>