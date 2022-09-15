<?php
  // Шаблоны это html с php кодом которые возвращаются браузеру для вывода 
  // Данные в шаблоны передаются из контроллеров, в шашем случае из MainController
  // Шаблоны находятся в D:\lesson\Lesson\php\php30\mysite.local\Laravel\laraveltest.local\resources\views
  // Файл создаем вручную с расширение php с нужным нам именем шаблона, в шашем случае example.php
  // Но чаще не используют обычные шаблоны а используют специальные шаблоны для Laravel с расшерением имя шаблона.blade.php
  // В laravel есть возможность задавать глобальные переменные для передачи их в шаблоны
  // задаются они в файле  D:\lesson\Lesson\php\php30\mysite.local\Laravel\laraveltest.local\app\Providers\AppServiceProvider.php
  // в методе boot через фасад View::share('имя', 'значение');
?>