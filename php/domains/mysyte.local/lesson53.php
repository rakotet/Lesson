<?php
// методы класса Exception

try {
    throw new Exception('Error message', 1); // выбрасываем исключение, вторым параметром можно указать код ошибки (всегда целое число)
} catch (Exception $e) { // обрабатываем исключение
    echo $e->getMessage().'<br/>'; // метод выводит сообщение которые мы сами пишем в исключении
    echo $e->getCode().'<br/>'; // метод выводит код (всегда целое число) который мы сами пишем в исключении
    echo $e->getFile().'<br/>'; // метод выводит путь к файлу в котором возникло данное исключение
    echo $e->getLine().'<br/>'; // метод выводит строку в которой возникло данное исключение
    print_r($e->getTrace()); // создает массив всех вызовов (стек методов)
    echo '<br/>';
}

// от класса Exception можно наследоваться и создавать собственные классы обработки ошибок

class FileException extends Exception {

}

class NameException extends Exception {
    public function _construct(int $code) // переопределяя конструктор нужно обращаться к родительскому конструктору
    {
        parent::__construct('', $code); // обращаемся к родительскому конструктору (указываем параметры родителя и новые свои)
    }
}

try {
    $name = '';
    $file = 'm.txt';
    if (!$name) throw new NameException(1);
    if (!file_exists($file)) throw new FileException('Файл не найден', 1);
}   catch (Exception $e) {
    echo $e->getMessage().'<br/>';
}