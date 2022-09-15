<?php

use App\Http\Controllers\DzControl;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
    пример нового роута в рамках этой ф-и можно писать любой php код
  он оботразится в браузере, но обычно она возвращает шаблон страницы html указанный в \laraveltest.local\resources\views\шаблон
  если допустить ошибку по laravel выведет её в своём особом стиле с большин количеством инфы
  Route работают с get, post, put, patch, delete запросами
 */

 // если есть два роута на одинаковый url то работать будет только последний

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return 1;
});

Route::post('/about', function () {
    return 2;
});

// так же можно обрабатывать одним роутом несколько видов запросов (указать в массиве)

Route::match(['post', 'get'], '/contacts', function () {
    return 'contacts';
});

// что бы одним роутом обрабатывать обсолютно все виды запросов указываем any

Route::any('/all', function () {
    return 3;
});

//     так же можно обрабатывать роуты на динамические параметры в url
//   пример такого url /laraveltest.local/public/to/sff/12
//   где post = sff а comment = 12 

Route::get('/to/{post}/{comment}', function ($id, $comment) {
    return $id.' - '.$comment;
});

//     в ларавел есть важнейший механизм внедрение зависимостей
//   для использования request нужно сначала добавить
//   use Illuminate\Http\Request;

Route::get('/user/{id}', function (Request $request, $id) {
    echo $request->path().'<br />';
    return $id;
});

//динамические параметры могут быть не обязательными, но тогда нужно оставлять их значение по умолчанию 

Route::get('/users/{id?}', function ($id = 1) {
    return 'user: '.$id;
});

// параметры в запросе можно фильтровать спомощью регулярных выражений (когда параметр 1)

Route::get('/gogo/{id?}', function (Request $request, $id = 1) {
    echo $request->path().'<br />';
    return $id;
})->where('id', '[0-9]+');

// параметры в запросе можно фильтровать спомощью регулярных выражений (когда параметр несколько, передаём их в ассациативном массиве)

Route::get('/gogo/{id?}/{to?}', function (Request $request, $id = 1, $to = 1) { // имена переменных могут быть любыми главное порядок аргументов
    echo $request->path().'<br />';
    return $id.' - '.$to;
})->where(['id' => '[0-9]+', 'to' => '1']);

// параметры в запросе можно фильтровать спомощью уже готовых ф-й и не рег. выражений

Route::get('/gogo/{id?}/{to?}', function (Request $request, $id = 1, $to = 1) { // имена переменных могут быть любыми главное порядок аргументов
    echo $request->path().'<br />';
    return $id.' - '.$to;
})->whereNumber('id');

// роутам можно присваивать имена, имена роутам желательно присваивать что при изменении ссылки ни где ни пришлось ни чего больше менять

Route::get('/gogo/{id?}/{to?}', function (Request $request, $id = 1, $to = 1) {
    echo $request->path().'<br />';
    return $id.' - '.$to;
})->whereNumber('id')->name('user');

// так же можно создавать группы маршрутов если они схожи
// url будет /laraveltest.local/public/manager
// используется если у нам много маршрутов начинающихся с manager/

Route::prefix('manager')->group(function() {
    Route::get('/', function() {
        return 'manager.index';
    });

    Route::post('/', function() {
        return 'manager.index';
    });
});

// ограничители запросов 

Route::any('/all', function () {
    return 3;
})->middleware('throttle:test'); // ф-я для закреплением за роутом ограничителя запросов по созданному имени ограничителя 

// ограничитель запросов сразу на группу роутов

Route::group(['prefix' => 'manager', 'middleware' => 'throttle:test'], function() {
    Route::get('/1', function() {
        return 'manager.index';
    });

    Route::post('/1', function() {
        return 'manager.index';
    });
});


//редирект - перенаправление

Route::redirect('/myuser', '/all'); // 1 арг с кокого адреса 2 арг на какой
Route::redirect('/myuser2/{id}', '/gogo/{id}'); // так же можно делать редирект и с параметрами

// дз

Route::match(['get', 'post'], '/products', function(Request $request) {
    return $request->url().'<br />';
});

Route::match(['get', 'post'], '/product/{id}/{comment}', function(Request $request, $id, $comment) {
    return $request->url().'<br />';
});

Route::prefix('admin')->group(function() {
    Route::match(['get', 'post'], '/', function(Request $request) {
        return $request->url().'<br />';
    });

    Route::match(['get', 'post'], '/auth', function(Request $request) {
        return $request->url().'<br />';
    })->middleware('throttle:test');

    Route::match(['get', 'post'], '/products', function(Request $request) {
        return $request->url().'<br />';
    });

    Route::match(['get', 'post'], '/clients', function(Request $request) {
        return $request->url().'<br />';
    });
});

// тема про посредников

Route::get('/secretpage', function () {
    return 'secretpage';
})->middleware('checklocalhost');

Route::get('/secretpage', function(Request $request) {
    return $request->fullUrl().'<br />';
})->middleware('checkkey');

// тема про контроллеры

Route::get('/home', [MainController::class, 'home']); // связываем контроллер с роутом, в массиве 1 арг это название нужного контроллера, 2 арг нужная ф-я из этого контроллера
Route::get('/map', [MainController::class, 'map']);
Route::get('/message/{id}', [MainController::class, 'message']); // {id} параметр передастся в нашу ф-ю контроллера message($id)
Route::get('/request', MainController::class); // с этом случае вызовется ф-я контроллера __invoke

// дз

Route::get('/mypage', [DzControl::class, 'dzMyPage']);

// тема шаблоны

Route::get('/testview', [MainController::class, 'testView']);

// тема blade шаблоны

Route::get('/testblade', [MainController::class, 'testBlade']);

