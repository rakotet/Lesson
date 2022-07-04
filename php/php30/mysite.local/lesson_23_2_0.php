<?php
  define('FILE_COMMENTS', 'lib/lesson_23_2_0.txt');
  $comment = $_REQUEST['comment'] ?? '';

  if(is_string($comment)) {
    $comment = htmlspecialchars($comment); // обезопасивает строку от потенциально вредоностного кода (ни когда не сохранять и не выводить не проверенные строки!!!)
    $comment = str_replace("\r\n", '<br />', $comment); // заменяем все переходы на новую строку на переход на новую строку через тег br

    if($comment) {
      file_put_contents(FILE_COMMENTS, file_get_contents(FILE_COMMENTS).$comment."\r\n"); // "\r\n" - переход на новую строку с возвратом коретки
    }
  }
  
  $comments = file_get_contents(FILE_COMMENTS);
  $comments = explode("\r\n", $comments);
  print_r($comments);
?>

<form name="myform" action="" method="get">
  <label>Ваш комментарий:</label>
  <br />
  <textarea name="comment"></textarea>
  <br />
  <br />
  <input type="submit" value="Отправить">
</form>
<?php foreach($comments as $c) { ?>
  <?php if($c) { ?>
    <p><?=$c?></p>
  <?php } ?>
<?php } ?>