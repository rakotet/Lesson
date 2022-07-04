<?php
  print_r($_POST);
  echo '<br />';
  $mailings = $_POST['mailings'] ?? [];
  foreach ($mailings as $v) echo $v.'<br />';

  $user = $_POST['user'] ?? [];
  print_r($user);
  echo '<br />';
  if(isset($user['name'])) echo $user['name'].'<br />';



?>
  <!-- Отправка данных в виде массива через конструкцию имя переменной[] -->

<form name="form_1" action="" method="post">
  <h4>Напишите рассылки, которые Вы хотели бы видеть на нашем сайте:</h4>
  <label>Рассылка 1:</label>
  <input type="text" name="mailings[]" /> <!-- такая запись имени озночает что данные будут отправленны как массив -->
  <br />
  <label>Рассылка 2:</label>
  <input type="text" name="mailings[]" /> <!-- переменая имени такая же что бы данные собирались в массив -->
  <br />
  <label>Рассылка 3:</label>
  <input type="text" name="mailings[]" /> <!-- переменая имени такая же что бы данные собирались в массив -->
  <br />
  <input type="submit" value="Отправить" />
</form>

  <!-- Отправка данных в виде массива через конструкцию имя переменной[ключ] -->

<form name="form_2" action="" method="post">
  <h4>Укажите ваши даныне</h4>
  <label>Имя</label>
  <input type="text" name="user[name]"/>
  <br />
  <label>Возраст</label>
  <input type="text" name="user[age]"/>
  <br />
  <input type="submit" value="Отправить" />
</form>

<!-- Отправка данных в виде массива через конструкцию имя переменной[] из всплывающего списка с возможностью множественного выбора -->

<form name="form_3" action="" method="post">
  <h4>Выберите ваши любимые цвета:</h4>
  <select name="colors[]" multiple="multiple">
    <option value="red">Красный</option>
    <option value="green">Зелёный</option>
    <option value="blue">Синий</option>
  </select>
  <br />
  <input type="submit" value="Отправить" />
</form>