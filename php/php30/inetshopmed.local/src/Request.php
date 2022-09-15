<?php
  class Request {

    private array $data;

    public function __construct()
    {
      $this->data = $this->xss($_REQUEST);
    }

    public function __get(string $name) : mixed {
      if(isset($this->data[$name])) return $this->data[$name];
      return false;
    }

    public function __isset(string $name) : bool {
      return isset($this->data[$name]);
    }

    private function xss(array|string $data) : array|string { // принимает и возвращает либо строку либо массив
      if(is_array($data)) {
        $escaped = [];
        foreach($data as $key => $value) {
          $escaped[$key] = $this->xss($value); // используем рекурсию т.к. не известно сколько и каких параметров будет в $_REQUEST и их вложенность
        }

        return $escaped;
      }

      return trim(htmlspecialchars($data)); // обезопасиваем данные
    }

  }
?>