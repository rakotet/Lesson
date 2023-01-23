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
          <div class="item-name grined">На рассмотрении</div>
        <?php } elseif($getMemoUser[$i]['status'] == 3) { ?>
          <div class="item-name grineds">На исполнение</div>
        <?php } elseif($getMemoUser[$i]['status'] == 4) { ?>
          <div class="item-name grin">Завершено</div>
        <?php } ?>
      </div>
      <div>
        <hr>
      </div>
      <div>
        <div class="item-wrap">
          <div class="item-coordinating">
            <span>Согласующие: </span>
            <?php foreach(json_decode($getMemoUser[$i]['signature'], true) as $key => $usersSing) { 
              if($usersSing[1] == 0 && $usersSing[0] == (int) $auth_user[0]['id']) $printSign = true; ?>
              <div class="coordinating" data-sing="<?=$usersSing[1]?>" 
                <?php if($getMemoUser[$i]['status'] == 1 && $key != 0 && count(json_decode($getMemoUser[$i]['signature'], true)) > 2) { ?>
                  data-userSingId="<?=$usersSing[0].'_'.$getMemoUser[$i]['id']?>"
                <?php } ?>
                ><?=$nameAndDepartamentUser($usersSing[0], true)?>
              </div>
            <?php } ?>
          </div>
          <div>
            <?php if($printSign && $getMemoUser[$i]['status'] != 4) { 
              $printSign = false ?>
              <a href="/page/myWriteReporting?idmemo=<?=(int) $getMemoUser[$i]['id']?>">Согласовать</a>
            <?php } ?>
          </div>
        </div>
        <?php if($getMemoUser[$i]['status'] == 3 || $getMemoUser[$i]['status'] == 4) { ?>
          <div class="item-executor__a">
            <span>Ответственный исполнитель: <?=$getNameToId($getMemoUser[$i]['executor_id'])?></span>
            <?php if($getMemoUser[$i]['status'] != 4 && $auth_user[0]['id'] == $getMemoUser[$i]['executor_id'] && $getMemoUser[$i]['ready'] == 0) { ?>
              <a href="/page/myWriteReporting?readyMemo=<?=(int) $getMemoUser[$i]['id']?>">Выполнено</a>
            <?php } elseif($getMemoUser[$i]['ready'] == 1) { ?>
              <span class="item-executor__ready">Выполнено</span>
            <?php } ?>
          </div>
        <?php } ?>
        <?php if($auth_user[0]['type'] == 1 && $getMemoUser[$i]['status'] != 4) { ?> <!-- Выбор исполнителя для менеджера начало -->
          <div class="item-executor">
            <form action="" name="myWriteReporting" method="post" enctype="multipart/form-data">
              <?php if($getMemoUser[$i]['status'] == 2 || $getMemoUser[$i]['status'] == 1) { ?>
                <span>Назначить испольнителя: &nbsp;&nbsp;</span>
              <?php } elseif($getMemoUser[$i]['status'] == 3) { ?>
                <span>Сменить испольнителя: &nbsp;&nbsp;</span>
              <?php } ?>
              <select class="signs copy" name="users_executor[]">
                <?php for($idUser = 0; $idUser < count($arrayUsers); $idUser++) { ?>
                  <option value="<?=$arrayUsers[$idUser]['id'].'_'.$getMemoUser[$i]['id']?>"><?=$arrayUsers[$idUser]['department']?> <?=$arrayUsers[$idUser]['name']?></option>
                <?php } ?>
              </select>
              <div class="form-executor__submit">
                <?php if($getMemoUser[$i]['status'] == 2 || $getMemoUser[$i]['status'] == 1) { ?>
                  <input type="submit" name="myWriteReporting" value="Назначить">
                <?php } elseif($getMemoUser[$i]['status'] == 3) { ?>
                  <input type="submit" name="myWriteReporting" value="Сменить">
                <?php } ?>
              </div>
            </form>
            <div class="item-back">
              <a href="/page/myWriteReporting?backId=<?=$getMemoUser[$i]['id']?>">Вернуть на согласование</a>
            </div>
            <div class="item-end">
              <a href="/page/myWriteReporting?endId=<?=$getMemoUser[$i]['id']?>">Завершить документ</a>
            </div>
          </div>
        <?php } ?> <!-- Выбор исполнителя для менеджера конец -->
        <?php if($getMemoUser[$i]['status'] == 1 || $auth_user[0]['type'] == 1 && ($getMemoUser[$i]['status'] == 1 || $getMemoUser[$i]['status'] == 2)) { ?>
          <div class="item-addSing"> <!-- Добавление согласующего начало -->
            <div class="item-addSing__open" data-addSing="<?=$getMemoUser[$i]['id']?>">Добавить согласующего</div>
            <form action="" name="myWriteReportingSing" method="post" enctype="multipart/form-data" data-addSingOpen="<?=$getMemoUser[$i]['id']?>">
              <select class="signs copy" name="addSing">
                <?php for($idUser = 0; $idUser < count($arrayUsers); $idUser++) { ?>
                  <option value="<?=$arrayUsers[$idUser]['id'].'_'.$getMemoUser[$i]['id']?>"><?=$arrayUsers[$idUser]['department']?> <?=$arrayUsers[$idUser]['name']?></option>
                <?php } ?>
              </select>
              <div class="form-executor__submit">
                <input type="submit" name="myWriteReportingSing" value="Добавить">
              </div>
            </form>
          </div> <!-- Добавление согласующего конец -->
        <?php } ?>
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
                <?php if(count($arrFileWrite) > 1 && ($getMemoUser[$i]['status'] == 1)) { ?>
                  <a class="item-link__dell" href="/page/myWriteReporting?removeDoc=<?=$file?>&memoId=<?=$getMemoUser[$i]['id']?>">Удалить</a>
                <?php } ?>
                <?php if (!next($arrFileWrite) && ($getMemoUser[$i]['status'] == 1)) { ?>
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
        <div class="item-comments">
          <span class="item-comments__span" data-id="<?=$getMemoUser[$i]['id']?>">Открыть комментарии</span>
          <div class="item-comments__container" data-comment="<?=$getMemoUser[$i]['id']?>">
            <?php if($getMemoUser[$i]['comment']) { ?>
              <div>
                <?=$getMemoUser[$i]['comment']?>
              </div>
            <?php } ?>
            <div>
              <form action="" name="writeReportingCommit" method="post" enctype="multipart/form-data">
                <div>
                  <textarea name="textComment" cols="100" rows="5"></textarea>
                </div>
                <div>
                  <input name="idMemoComment" type="text" value="<?=$getMemoUser[$i]['id']?>" style="display: none;">
                  <input type="submit" name="writeReportingCommit" value="Добавить комментарий">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  <?php } ?>
</div>

<script src="../js/myWriteReporting.js?<?php echo $vers; ?>"></script>