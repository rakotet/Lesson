<div class="writeReporting">
  <form action="" name="writeReporting" method="post" enctype="multipart/form-data">
    <div class="form-content">
      <div><?=date('d.m.Y')?></div>
      <div class="content-towhom">
        <div>Директору ООО Волга-Д</div>
        <div>Ковалеву Д. Г.</div>
      </div>
      <div class="content-fromwhom">
        <div>От <?=$auth_user[0]['department']?></div>
        <div><?=$auth_user[0]['name']?></div>
      </div>
      <h1>
        <select name="typeMemo">
          <option value="1">Служебная записка</option>
          <option value="2">Приказ</option>
          <option value="3">Договор</option>
        </select>
      </h1>
      <div class="content-topic">
        <div>
          <span>Тема: </span>
          <input type="text" name="tema" required>
        </div>
        <div>
          <span>Согласовывающие: </span>
          <select class="signs" name="users_sign[]">
            <option value="<?=$auth_user[0]['id']?>"><?=$auth_user[0]['department']?> <?=$auth_user[0]['name']?></option>
          </select>
          <select class="signs copy" name="users_sign[]">
            <?php for($idUser = 0; $idUser < count($arrayUsers); $idUser++) { ?>
              <?php if($arrayUsers[$idUser]['id'] != $auth_user[0]['id']) { ?>
                <option value="<?=$arrayUsers[$idUser]['id']?>"><?=$arrayUsers[$idUser]['department']?> <?=$arrayUsers[$idUser]['name']?></option>
              <?php } ?>
            <?php } ?>
          </select>
          <button class="signs-btn">Добавить</button>
        </div>
      </div>
      <div class="form-content__text">
        <input name="upload_files[]" type="file" required>
        <button class="uploads-btn">Добавить</button>
      </div>
    </div>
    <div class="form-content1__submit">
      <input type="submit" name="writeReporting" value="Отправить">
    </div>
  </form>
</div>

<script src="../js/writeReporting.js"></script>