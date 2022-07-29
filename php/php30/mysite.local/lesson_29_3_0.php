<?php
  // Трейты это механизм php который позволяет написать код один раз и использовать его там где нам это необходимо внутри разных классов
  // По сути в трейт можно вынести одинаковые куски кода класса которые есть в нескольких классах что бы не копировать один и тот же код снова и снова а просто его подключать

  trait Id { // создаём трейт через ключевое слово trait

    private $id;

    public function getId() {
      return $this->id;
    }

    public function setId($id) {
      $this->id = $id;
    }

  }

  trait Name { 

    private $name;

    public function getName() {
      return $this->name;
    }

    public function setName($name) {
      $this->name = $name;
    }

  }

  class User {

    use Id, Name; // подключаем трейты к классу используя ключевое слово use

  }

  class Article {

    use Id;

    public function __construct(int $id)
    {
      $this->id = $id; // используем свойство id взятое из нашего подключенного трейта
    }
  }

  $user = new User();
  $user->setId(10);
  $user->setName('Michail');
  echo $user->getId().'<br />';
  echo $user->getName().'<br />';

  $article = new Article(100);
  echo $article->getId().'<br />';
?>