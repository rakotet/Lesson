<?php
  abstract class Log {

   private string $dir;

    public function __construct(string $str)
    {
      $this->dir = $str;
    }

    protected function setFile(string $str) {
      if(file_get_contents($this->dir) == '') file_put_contents($this->dir, $str);
      else file_put_contents($this->dir, file_get_contents($this->dir)."\n$str");
    }

    abstract function add(string $str);
  }

  class WarningLog extends Log {
    public function add(string $str) {
      $this->setFile('Warning: '.$str);
    }
  }

  class ErrorLog extends Log {
    public function add(string $str) {
      $this->setFile('Error: '.$str);
    }
  }

  $war = new WarningLog('lib/lesson282dz.txt');
  $err = new ErrorLog('lib/lesson282dz.txt');

  $war->add(111);
  $err->add(222);
?>