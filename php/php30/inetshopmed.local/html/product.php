<div class="container-product">
  <h1><?=$arrayProductData[0]['name']?></h1>
  <div class="product-main">
    <div class="product-main__photo">
      <img src="<?=$arrayProductData[0]['image']?>">
    </div>
    <div class="product-main__price">
      <p class="price-number">от <span><?=$arrayProductData[0]['price']?></span> ₽/кг</p>
      <?php if($arrayProductData[0]['in_stock']) { ?>
        <p><span class="price-instock">В наличии</span></p>
      <?php } else { ?>
        <p><span class="price-instock">Под заказ</span></p>
      <?php } ?>
      
      <p class="price-delivery"><b>Бесплатная доставка от 10 000 р.</b></p>
      <?php if($arrayProductData[0]['in_stock']) { ?>
        <button class="price-button">Купить</button>
      <?php } else { ?>
        <button class="price-button">Оставить заявку</button>
      <?php } ?>
    </div>
  </div>

  <div class="product-description">
    <p class="description">Описание</p>
    <div class="product-line"></div>
    <p class="product-text">
      <?=$arrayProductData[0]['description']?>
    </p>
    
  </div>
</div>

<div class="container-buy close">
  <div class="container-buy__modal">
    <div class="modal-header">
      <h1>Варианты товара</h1>
      <button class="modal-btn__close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4L12 12M20 4L12 12M20 20L12 12M4 20L12 12" stroke="#B4B4B4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="modal-body__price">
        <p>Партия</p><p>Вес/кг</p><p>Регион</p><p>Цена</p>
      </div>
    </div>
    <div class="modal-body__buy">
      <p>Ж3321</p><p>1</p><p>Котово</p><p class="buy-price"><?=$arrayProductData[0]['price']?></p>
      <div class="buy-panel">
        <button class="buy-panel__btn minus"><span>-</span></button><input class="buy-panel__input" type="text" min="1" value="1" maxquantity="9" ratio="1"><button class="buy-panel__btn plus"><span>+</span></button>
        <div class="buy-panel__basket">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="20" r="2" stroke="#473816" stroke-width="2"></circle>
            <circle cx="19" cy="20" r="2" stroke="#473816" stroke-width="2"></circle>
            <path d="M1 2L4 2L6 14C6.5 16 8 16 9 16C10 16 21 16 21 16" stroke="#473816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M5 5L23 5L22 10C21.5 12 20 12 19 12C18 12 6.44444 12 6 12" stroke="#473816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <div class="basket-btn">
          Выбрать
        </div>
      </div>
    </div>
    <div class="basket-btn__buy" data="0">
      Купить
    </div>
  </div>
</div>
<script src="../js/btnBuy.js"></script>