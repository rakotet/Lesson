<?php
  // В php Глобальные переменные это переменные объявленыне за пределами ф-ий, а локальыне только объявленыне в ф-ях

  if(true) {
    $x = 5; // переменная будет видна (существует) и за пределами if (!!!!не как в JS)
  }

  echo $x.'<br />';

  for($i = 0; $i < 10; $i++); // так же и с переменными в циклах, они остаются после отработки цикла
  echo $i.'<br />';

  function func() {
    echo $x; // в ф-ях не видны переменные других if и for
    $a = 1; // за пределами ф-и эта переменная не существует
  }

  func();

  echo $a;

  echo '<br />';

  function testGlobal() {
    global $x; // через ключевое слово можно обращатсья в ф-ях к глобальным переменным (названия должно совпадать)
    $x++;
    $GLOBALS['x']++; // это массив который содержит в себе все глобальыне переменыне ($_GET, $_POST и т.д) в том числе и с этого скрипта, и через него можно к ним обращаться
  }

  testGlobal();
  echo $x.'<br />'; // значение изменится т.к. мы в ф-ии получили доступ к этой переменной через ключевое слово global

  // Есть статические переменные (они принадлежат самой ф-ии и сохраняют своё значение при следующем вызове ф-ии, не обнуляются в отличии от простых переменных)

  function getCount() {
    static $count = 0;
    $count++;
    return $count;
  }

  echo getCount().'<br />';
  echo getCount().'<br />';
  echo getCount().'<br />';
 
?>