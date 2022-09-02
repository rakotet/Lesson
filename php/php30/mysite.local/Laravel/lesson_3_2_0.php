<?php
  // \laraveltest.local\app\Providers\RouteServiceProvider.php - провайдер отвечающий за маршруты
  // \laraveltest.local\routes\web.php - файл отвечающий за маршруты через get и post запросы (там примеры)
  /* 

  пример нового роута в рамках этой ф-и можно писать любой php код
  он оботразится в браузере, но обычно она возвращает шаблон страницы html указанный в \laraveltest.local\resources\views\шаблон
  если допустить ошибку по laravel выведет её в своём особом стиле с большин количеством инфы
  Route работают с get, post, put, patch, delete запросами

  Route::get('/about', function () { 
    return 1;                                                            
  });


  так же можно обрабатывать одним роутом несколько видов запросов (указать в массиве)

  Route::match(['post', 'get'], '/contacts', function () {
      return 'contacts';
  });

  что бы одним роутом обрабатывать обсолютно все виды запросов указываем any

  Route::any('/all', function () {
    return 3;
  });

  так же можно обрабатывать роуты на динамические параметры в url
  пример такого url /laraveltest.local/public/to/sff/12
  где post = sff а comment = 12

  Route::get('/to/{post}/{comment}', function ($post, $comment) {
      return $id.' - '.$comment;
  });

  в ларавел есть важнейший механизм внедрение зависимостей
  для использования request нужно сначала добавить
  use Illuminate\Http\Request;

  Route::get('/user/{id}', function ($id, Request $request) {
    echo $request->path().'<br />';
    return $id;
  });


  динамические параметры могут быть не обязательными, но тогда нужно оставлять их значение по умолчанию 

  Route::get('/users/{id?}', function ($id = 1) {
    return 'user: '.$id;
  });

 Далее в самом файле роутов web.php  
  */
?>