<?php
  // При перехвате и обработке ошибок скрипт не прерыватся после ошибки

  try { // что бы перехватить ошибку нужно обернуть код где может быть ошибка в блок try {}

    $email = '123mail.ru';

    if(!str_contains($email, '@')) {
      throw new Exception('Некорректный email'); // выбрасываем исключение при ошибке, после этого дальнейший код блока try не выполняется а переходит сразу в блок catch
    }

    echo 'email прошел проверку';

  } catch(Exception $e) { // блок обработки перехваченной ошибки (исключения)

    echo 'Возникла ошибка: '.$e->getMessage(); // выводим сообщение при ошибке которое мы написали в нашем исключении в строке throw

  } finally { // не обязательный блок, код в нем будет выполняться всегда, в не зависимости от того была ли ошибка и нет

    echo '<br />Тут блок finally<br />';

  }

  class User {

    private string $name;
    private const MIN_LEN = 2;

    public function setName(string $name) {
      if(!$name) throw new Exception('Имя не указано'); // !!! можно выбрасывать исключения где угодно, даже без блока try-catch, и обработывать его в другом месте, если ни где не обработать будет fatal error
      if(mb_strlen($name) < self::MIN_LEN) throw new Exception('Имя меньше двух символов');
      $this->name = $name;
    }
  }

  $user = new User();
  $user->setName('Oleg');

  try { 

    $user->setName(''); // будет выброшенно исключение описанное выше

  } catch(Exception $e) {

    echo 'Возникла ошибка: '.$e->getMessage();

  }
?>