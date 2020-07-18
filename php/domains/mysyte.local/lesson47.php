<?php
// трейты нечто среднее между классом и интерфейсом, только в них можно методы реализовывать, класс может брат ьсебе любое количество трейтов, сокращают код в классах которые используют одни и теже реализации методов

trait Id {
    protected $id;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }
}

trait Name {
    protected $name;

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }
}

class User {

    use Id, Name; // для использование трейдов в классе используем ключевое слово use и перечисляем трейды которые хотим использовать
}

$user = new User();
$user->setId(10);
$user->setName('Michail');
echo $user->getId().'<br/>';
echo $user->getName().'<br/>';
?>

