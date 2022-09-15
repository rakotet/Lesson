<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <title>Laravel</title>
</head>
<body>
  <p>a: {{ $a }}</p>
  <p>b: {{ $b }}</p>
  <p>b: {!! $b !!}</p>
  <p>@{{ $a }}</p>

  @php
    $x = 12;
    $y = 7;
    $z = $x + $y;
  @endphp

  <p>z: {{ $z }}</p>

  @if(is_numeric($a))
    <p>a - это число</p>
  @elseif(is_string($a))
    <p>a - это строка</p>
  @else
    <p>a - это другой тип</p>
  @endif

  @isset($b)
    <p>b - существует</p>
  @endisset

  @switch($c)
    @case(1)
      <p>1</p>
      @break
    @case(2)
      <p>2</p>
      @break
    @case(3)
      <p>3</p>
      @break
    @default
      <p>---------</p>
  @endswitch

  <p>
    @for($i = 0; $i < 5; $i++)
      {{$i}}
      @if($i < 4)
        ,
      @endif
    @endfor
  </p>
  <p>
    @foreach([1, 2, 5, 7, 9] as $n)
      @if($n == 7)
        @continue
      @endif
      {{ $loop->iteration }} - {{ $n }} {{-- $loop->iteration номер итерации цикла --}}
      @if(!$loop->last) {{-- $loop->last возвращает true если последняя итерация цикла --}}
        ,
      @endif
    @endforeach
  </p>
  @include('child', ['data' => 'очень важная информация']) {{-- подключаем другой шаблон --}}
  @includeWhen($c == 3, 'child', ['data' => 'c = 3']) {{-- подключаем другой шаблон по условию, 1арг условие, 2арг имя шаблона, 3арг данные --}}

  @each('comments', ['комментарий 1', 'комментарий 2', 'комментарий 3'], 'comment') {{--можно сказать что это сокращенная запись форрича--}}

  <script>
    let x = {{ Js::from([1, 2, 3]) }} // парсит массив в Json строку
  </script>
</body>
</html>
