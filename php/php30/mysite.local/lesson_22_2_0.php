<?php
  print_r($_POST);
  echo '<br />';
  print_r($_REQUEST); // массив который содержит в себе данные GET и POST запросов
  echo '<br />';

  $name = $_POST['name'] ?? '';
  $mood = $_POST['mood'] ?? 50;
  $text = $_POST['text'] ?? '';
  $source = $_POST['source'] ?? '';
  $news = isset($_POST['news']) ? true : false;
?>

<form name="myform" action="" method="post">
  <label>Имя:</label>
  <input type="text" name="name" value="<?=$name?>" />
  <?php if(!$name) { ?><span>Введите имя!!!</span><?php } ?>
  <br />
  <label>Ваше настроение:</label>
  <input type="range" name="mood" min="0" max="100" value="<?=$mood?>" step="10" />
  <br />
  <label>Ваш комментарий:</label>
  <br />
  <textarea name="text"><?=$text?></textarea>
  <br />
  <label>Как вы нас нашли:</label>
  <br />
  <input type="radio" name="source" value="search_system"<?php if($source == 'search_system') { ?> checked="checked"<?php } ?> /> Через поисковую систему
  <input type="radio" name="source" value="friends"<?php if($source == 'friends') { ?> checked="checked"<?php } ?> /> Через друзей
  <br />
  <label>Подписаться на наши новости:</label>
  <input type="checkbox" name="news"<?php if($news) { ?> checked="checked"<?php } ?> />
  <br />
  <input type="submit" value="Отправить" />
</form>