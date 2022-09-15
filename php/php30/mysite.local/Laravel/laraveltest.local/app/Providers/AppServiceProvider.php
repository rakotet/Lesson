<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
//use Illuminate\Contracts\View\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::share('global_var', 'test data'); // задаем глобальную переменную для всех шаблонов 
        /*
        View::composer('example', function($view) { // задаем глабальыне переменные которые будут доступны только в определенных шаблонах
            $view->with('composer_data', 'hello'); // добавляем переменные в наш шаблон
        });
        */
        View::composer('example', \App\View\Composers\ExampleComposer::class); // передаем даныне в шаблон через нами созданный класс, самый верный способ
        //View::composer(['example', 'sub.example'], \App\View\Composers\ExampleComposer::class); // если хотим что бы наш класс компановщик работал на нескольких шаблонах, то передаем массив с именами этих шаблонов

        View::composer('mypage', \App\View\Composers\DzComposer::class);
    }
}
