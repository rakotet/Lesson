<div class="menumed">
  <?php foreach($catalog as $categori) { ?>
    <ul>
      <li>
        <a href="/page/categori?med=<?=$categori['id']?>">
          <?php if($activ == $categori['id']) { $nameMed = $categori['name']?>
            <span class="active"><?=$categori['name']?></span>
          <?php } else { ?>
            <span><?=$categori['name']?></span>
          <?php }?>
        </a>
      </li>
    </ul>
  <?php } ?>
</div>

<div class="content-categori">
  <h1><?=$nameMed?></h1>
  <div class="content-categori__items">
    <?php foreach ($arrayCategori as $arrCat) { ?>
      <div class="items">
        <a href="/page/product?med=<?=$pseudonym?>&number=<?=$arrCat['id']?>">
        <?php if($arrCat['in_stock']) { ?>
          <div class="items-card">
        <?php } else { ?>
          <div class="items-card hide">
        <?php } ?>
            <span>В наличии</span>
          </div>
          <img class="img" src="<?=$arrCat['image']?>" data-id="<?=$arrCat['id']?>">
          <div class="items-card__price">от <span><?=$arrCat['price']?> руб.</span>  ₽/кг </div>
          <div class="items-card__name"><?=$arrCat['name']?> </div>
          <div class="items-card__footer b<?=$arrCat['id']?>">
            <button class="items-card__btn">
              <?php if($arrCat['in_stock']) { ?>
                <span class="btn">В наличии</span>
              <?php } else { ?>
                <span class="btn">Под заказ</span>
              <?php } ?>
            </button>
          </div>
        </a>
      </div>
    <?php } ?>
    <script src="../js/categoriBtn.js"></script>
  </div>
</div>

