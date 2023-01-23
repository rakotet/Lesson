<div class="header-top">

  <div class="header-top__login">		
    <?php if($auth_user) { ?>
      <a href="/?logout">Выход</a>
    <?php } ?>
  </div>

  <div class="header-top__center">
    ООО Волга-Д
  </div>

  <div class="header-top__right">
    <?php if($auth_user) { ?>
      <div class="right__user"><?=$auth_user[0]['name']?></div>
    <?php } ?>
  </div>
  
</div>
