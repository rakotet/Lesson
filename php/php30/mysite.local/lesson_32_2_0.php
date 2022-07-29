<?php
  try {
    throw new Exception('Error Message', 1); // второй параметр ф-я не обязательный, это код нашего исключения который потом можно получить из Exception $e при обработке этого исключения
  } catch(Exception $e) {
    echo $e->getMessage().'<br />'; // возвращает сообщение переданное из выбрашенного исключения
    echo $e->getCode().'<br />'; // возвращает переданный код исключения
    echo $e->getFile().'<br />'; // возвращает имя файла в котором выбросили исключение 
    echo $e->getLine().'<br />'; // возвращает строку в которой было выброшенно исключение
    print_r($e->getTrace()); // возвращает массив в котором содержится стек вызовов который привел к ошибке
    echo '<br />';
    echo $e->getTraceAsString().'<br />'; // возвращает стек вызовов в виде строки а не массива
  }

  function func1() {
    throw new Exception('error message');
  }

  function func2() {
    func1();
  }

  try {
    func2();
  } catch(Exception $e) {
    print_r($e->getTrace()); // выводим массив стек вызовов который закончился ошибкой
    echo '<br />';
    echo $e->getTraceAsString().'<br />';
  }

  // Создаём свой класс для обработки исключений

  class FileException extends Exception { // пустая реализация клсса наследника, по сути мы просто изменили имя класса с которым можно работать с исключениями, но можно делат ьи свою реализацию если нужно

  }

  class NameException extends Exception {

    public function __construct(int $code)
    {
      parent::__construct('', $code); // вызываем родительский конструктор класса родителя Exception, который должен принимать строку и число, но в нашем классе нам нужно только число
    }
  }

  try {
    $name = '555';
    $file = 'notfile.txt';

    if(!$name) throw new NameException(1); // выбрасываем исключение используя наш класс для обработки исключений
    if(!file_exists($file)) throw new FileException('Файл не существует');

  } catch(Exception $e) { // перехватываем все исключения всех классов исключений (в том числе Exception и созданные нами)
    if($e instanceof NameException) echo 'Это исключение NameException'; // ф-я instanceof проверяет принадлежит ли объект к классу 
    elseif($e instanceof FileException) echo 'Это исключение FileException';
    echo '<br />'.$e->getCode().'<br />';
  }

  /////////// Ниже тоже самое, но с перехватом исключений конкретных классов (вроде как более удобный и правильный метод)

  try {
    $name = '';
    $file = 'notfile.txt';

    if(!$name) throw new NameException(1); 
    if(!file_exists($file)) throw new FileException('Файл не существует');

  } catch(NameException $e) { // перехватываем исключения конкретного класса в отдельном блоке catch, php ищит ближайший подходящий блок catch и дальше не идет, тоесть отрабатывает всегда только один блок catch, поэтому catch с обычным Exception нужно ставить в самом последнем catch
    echo 'Это исключение NameException'; 
    echo '<br />'.$e->getCode().'<br />';
  } catch(FileException $e) { // перехватываем исключения конкретного класса в отдельном блоке catch
    echo 'Это исключение FileException'; 
    echo '<br />'.$e->getCode().'<br />';
  } catch(Exception $e) { // перехватываем исключения конкретного класса в отдельном блоке catch
    echo 'Это исключение Exception'; 
    echo '<br />'.$e->getCode().'<br />';
  }
?>
