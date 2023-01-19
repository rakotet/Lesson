<div class="menu">
  <ul>
    <li><a href="/page/content">Инструкция</a></li>
    <li><a href="/page/writeReporting">Создать документ</a></li>
    <li><a href="/page/myWriteReporting">Мои документы</a></li>
    <li><a href="/page/myWriteReporting?search=1">Завершенные</a></li>
    <?php if($auth_user[0]['name'] == "Матлашевский А А") { ?>
      <li><a href="/page/myWriteReporting?test=1">Тест</a></li>
    <?php } ?>
  </ul>
</div>
<div class="separator">

</div>
<div id="content-right">
  <?php require_once "$contentRight.php"?>
</div>