<div class="myWriteReporting">
  <?php if(count($getMemoUser) > 0) { ?>
    <h1>В работе</h1>
    <div class="myWriteReporting-panel">
      <div class="panel-name">Дата</div><div class="panel-name panel-tema">Тема</div><div class="panel-name panel-type">Тип</div><div class="panel-name">От</div><div class="panel-name panel-status">Статус</div>
    </div>
  <? } else { ?>
    <h1>В работе нет документов</h1>
  <?php } ?>
  <?php for($i = 0; $i < count($getMemoUser); $i++) { ?>
    <div class="myWriteReporting-wraper">
      <div class="myWriteReporting-item">
        <div class="item-name"><?=date('d.m.Y', $getMemoUser[$i]['date'])?></div>
        <div class="item-name item-tema"><?=$getMemoUser[$i]['tema']?></div>
        <div class="item-name item-tema"><?=getMemoType($getMemoUser[$i]['type_memo'])?></div>
        <div class="item-name item-tema"><?=$nameAndDepartamentUser($getMemoUser[$i]['id_user'])?></div>
        <?php if($getMemoUser[$i]['status'] == 1) { ?>
          <div class="item-name grin">На согласовании</div>
        <?php } elseif($getMemoUser[$i]['status'] == 2) { ?>
          <div class="item-name grined">На Рассмотрении</div>
        <?php } ?>
      </div>
      <div>
        <hr>
      </div>
      <div>
        <div class="item-wrap">
          <div class="item-coordinating">
            <span>Согласующие: </span>
            <?php foreach(json_decode($getMemoUser[$i]['signature'], true) as $usersSing) { 
              if($usersSing[1] == 0 && $usersSing[0] == (int) $auth_user[0]['id']) $printSign = true; ?>
              <div class="coordinating" data-sing="<?=$usersSing[1]?>"><?=$nameAndDepartamentUser($usersSing[0], true)?></div>
            <?php } ?>
          </div>
          <div>
            <?php if($printSign) { 
              $printSign = false ?>
              <a href="/page/myWriteReporting?idmemo=<?=(int) $getMemoUser[$i]['id']?>">Согласовать</a>
            <?php } ?>
          </div>
        </div>
        <div>
          <hr>
        </div>
        <div class="item-name link">
          <div>
            <span>Файлы: </span>
          </div>
          <?php $arrFileWrite = json_decode($getMemoUser[$i]['dir'], true); foreach($arrFileWrite as $file) { ?>
            <div class="link-wrap">
              <a class="item-link" href="<?=$file?>" download><?=nameFile($file)?></a>
              <?php if($getMemoUser[$i]['id_user'] == $auth_user[0]['id']) { ?>
                <?php if(count($arrFileWrite) > 1) { ?>
                  <a class="item-link__dell" href="/page/myWriteReporting?removeDoc=<?=$file?>&memoId=<?=$getMemoUser[$i]['id']?>">Удалить</a>
                <?php } ?>
                <?php if (!next($arrFileWrite)) { ?>
                  <div class="item-download" data-id="<?=$getMemoUser[$i]['id']?>">
                    <form action="" name="writeReporting" method="post" enctype="multipart/form-data">
                      <div class="form-content__text">
                        <input name="upload_files[]" type="file" required>
                        <button class="uploads-btn1" data-id="<?=$getMemoUser[$i]['id']?>">Добавить файл</button>
                      </div>
                      <div class="form-content2__submit">
                        <input name="idMemoMyWriteReporting" type="text" value="<?=$getMemoUser[$i]['id']?>" style="display: none;">
                        <input type="submit" name="writeReporting" value="Загрузить файлы">
                      </div>
                    </form>
                  </div>
                  <div class="item-btn__wrapp">
                    <button class="item-btn__hide" data-id="<?=$getMemoUser[$i]['id']?>">Добавить файлы</button>
                  </div>
                <?php } ?>
              <? } ?>
            </div>
          <?php } ?>
        </div>
      </div>
    </div>
  <?php } ?>
</div>

<script src="../js/myWriteReporting.js"></script>


