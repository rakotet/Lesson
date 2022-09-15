<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use stdClass;

class DzControl extends Controller
{
    public function url(Request $request) 
    {
        return $request->url();
    }

    public function dzMyPage() 
    {
        $client1 = new stdClass();
        $client2 = new stdClass();
        $client3 = new stdClass();
        $client1->id = 1;
        $client1->name = 'Alex';
        $client1->email = 'a@mail.ru';
        $client2->id = 2;
        $client2->name = 'Oleg';
        $client2->email = 'o@mail.ru';
        $client3->id = 3;
        $client3->name = 'Igor';
        $client3->email = 'i@mail.ru';
        $clients = [$client1, $client2, $client3];

        return view('mypage', ['clients' => $clients]);
    }
}
