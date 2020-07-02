<?php
declare (strict_types = 1); //включение режима жеской типизации (если в функцию передан не верный тип данных выдает ошибку)

//создание функции
  function hello () 
  {
      echo 'Hello World <br/>';
  }

  hello(); //вызов функции

  function helloCount ($count = 5) { // = 5 это параметр по умолчанию, если при вызове функции не были пераданны параметры
      if (!is_int($count)) { // проверяем является ли $count целым числом
        echo 'Введено не целое число <br/>';
        return; // оператор выхода из цункции 
      }
    for ($i = 0; $i < $count; $i++) hello();
  }

  echo '<br/>';

  helloCount(2);

  echo '<br/>';

  helloCount();

  echo '<br/>';

  function summa ($a, $b) {
    echo "a + b = ".($a + $b);
  }

  summa(5, -3);

  echo '<br/>';

  function getSumma ($a, $b) {
    $summa = $a + $b;
    return $summa; // возвращаем значение
  }

  $summa = getSumma(5, -3); // записываем в переменную значение которое возвращает метод
  echo $summa;

  echo '<br/>';

  function change (&$x) { //используем жесткую ссылку что бы привязать $x к $a иначе при изменении $x, $a ни как не меняется
    $x++;
  }

  $a = 5;

  change($a);
  echo $a;

  echo '<br/>';

  // далее реализуем функцию с переменным количеством параметров 

  function summaN () {
      if (func_num_args() == 0) { // если параметры не переданны, выводим сообщение и завершаем выполнение функции
        echo 'Необходимы параметры!';
        return;
      }
      $summa = 0;
      for ($i = 0; $i < func_num_args(); $i++) { // func_num_args возвращает количество переданных в функцию параметров 
        if (!is_numeric(func_get_arg($i))) { // проверяем переданные параметры, являются ли они цифрами, если нет, выводим сообщение
            echo 'Параметры должны быть числами!!!';
            return;
        }
        $summa += func_get_arg($i); // func_get_arg перебирает все параметры переданные в функцию
      }
      return $summa;
  }

  echo summaN(1, 2.5);

  echo '<br/>';

  function diff (int $a, int $b) : int  // указывает тип возвращаемого значения и тип переданных в функцию параметров
  {
    return $a -$b;
  }

  echo diff (5, 3);
?>
