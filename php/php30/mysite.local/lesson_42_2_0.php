<?php
  // Файлы по парсингу EXCEL файла с использованием библиотеки shuchkin/simplexlsx находится в D:\lesson\Lesson\php\php30\test.local
  // Что бы подключить библиотеку установленную через composer нужно подключить в наш проэкт файл vendor/autoload.php

  require_once('../test.local/vendor/autoload.php');
  use Shuchkin\SimpleXLSX;
  
  function parsing(string $file) : string {
    $articles = [];
    $expenses = [];
    
    if ( $xlsx = SimpleXLSX::parse($file) ) { // $xlsx получается массив в котором каждое значение это массив со всеми значениями строки файла
        foreach($xlsx->rows() as $k => $v) {
          if($v[0] != 'Итого:' && is_numeric($v[1])) {
            $articles[] = $v[0];
            $expenses[] = $v[1];
          }
        }
    } else {
        echo SimpleXLSX::parseError();
    }
    print_r($articles);
    print_r($expenses);
    echo '<br />';
    return getResult($articles, $expenses);
  }

  function getResult(array $articles, array $expenses) : string {
    $index_min = getExtremeIndex($expenses, 'min');
    $index_max = getExtremeIndex($expenses, 'max');
    $s = '<b>Минимальный расход</b>:<br/>';
    $s .= "Статья: $articles[$index_min]<br/>";
    $s .= "Сумма: $expenses[$index_min]<br/>";
    $s .= '<br/>---------------------<br/>';
    $s .= '<b>Максимальный расход</b>:<br/>';
    $s .= "Статья: $articles[$index_max]<br/>";
    $s .= "Сумма: $expenses[$index_max]<br/>";
    $s .= '<br/>---------------------<br/>';

    return $s;
  }

  function getExtremeIndex(array $arr, callable $compare) : int {
    $extreme_index = 0;
    $extreme = $arr[$extreme_index];
    $i = 1;
    while($i < count($arr)) {
      if($compare($arr[$i], $extreme) == $arr[$i]) {
        $extreme = $arr[$i];
        $extreme_index = $i;
      }
      $i++;
    }

    return $extreme_index;
  }

  $message = parsing('../test.local/Test.xlsx');
  echo $message.'<br/>';

  ///////////////////////////////////

  use PHPMailer\PHPMailer\PHPMailer;
  $mail = new PHPMailer(true); // создаём объект библиотеки для работы с ним для правильного формирования писем (!!! не отправке а только создания письма)

  $mail->CharSet = 'utf-8'; // устанавливаем кодировку
  $mail->setFrom('admin@test.local', 'Администратор'); // от кого отправить
  $mail->addAddress('test@test.local', 'Joe User'); // кому отправить
  $mail->addAttachment('../test.local/Test.xlsx'); // прикрепить файл к письму
  $mail->isHTML(true); // тип файла
  $mail->Subject = 'Анализ файла'; // тема письма
  $mail->Body    = $message; // содержимое тела письма
  $mail->AltBody = strip_tags($message); // текстовый вариант письма, отправляется на всякий случай
  if($mail->send()) echo 'Письмо успешно отправленно';
  else {
    echo 'Ошибка при отправке письма<br/>';
    echo 'Ошибка: '.$mail->ErrorInfo.'<br/>';
  }

  ////////////////////////////////////


?>