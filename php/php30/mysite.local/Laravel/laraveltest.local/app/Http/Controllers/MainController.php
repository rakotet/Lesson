<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class MainController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return 'invoke';
    }

    public function home() {
        return 'home';
    }

    public function map() {
        return 'map';
    }

    public function message($id) {
        return $id;
    }

    // тема шаблоны

    public function testView() { 
        return view('sub.example', ['a' => 'hello', 'b' => 25]); // самый простой способ передать даныне в шаблон, это вызвать ф-ю view где 1 арг имя шаблона, 2 арг ассациативный массив с используюмыми переменными в шаблоне и их значениями
        /* return view('example') // еще один способ передать параметры в шаблон 
            ->with('a', 'hello')
            ->with('b', 25); */
        // return view('sub.example', ['a' => 'hello', 'b' => 25]); // если файл шаблона лежит в другой папке то путь прописывается через .
        // return View::make('sub.example', ['a' => 'hello', 'b' => 25]); // можно передавать данные через фасад View
        // return View::exists('example'); // ф-я фасада View которая возвращает true если такой шаблон есть 
    }

    public function testBlade() {
        return view('testblade', ['a' => 'hello', 'b' => '<b>Мой комментарий</b>', 'c' => 3]);
    }
}
