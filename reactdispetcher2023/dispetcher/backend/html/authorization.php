<div class="content">
  <div class="content-logo">
    <div>
      <div class="logo-row">
        <div>
          <img src="../image/logo.png" alt="">
        </div>
        <div class="logo-text">
          <div class="logo-text__one">МЫ СОГРЕВАЕМ ГОРОДА</div>
          <img class="logo-text__two" src="../image/text2.png" alt="">
        </div>
      </div>
      <div class="logo-list">
        <h2>Сервис диспетчеризации:</h2>
        <ul>
          <li>Учет автотранспорта для каждого диспетчера</li>
          <li>Логистика и управление в один клик</li>
          <li>Детальная информация по всем заявкам</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="auth-content">
    <form action="" method="post" name="auth" class="auth-content__form">
      <div class="form-h">
        <h2>Авторизация</h2>
        <?php if(isset($request->auth) && $auth_user == false) { ?>
          <h3>Неверный логин или пароль</h3>
        <?php } ?>
      </div>
      <input type="text" name="login" placeholder="Логин" class="form-input">
      <input type="password" name="password" placeholder="Пароль" class="form-input">
      <div>
        <input type="submit" name="auth" value="Вход" class="form-submit">
      </div>
    </form>
  </div>
</div>