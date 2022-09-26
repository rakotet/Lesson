<div class="catalog">
  <div class="catalog-product">
  <?php foreach($catalog as $categori) { ?>
    <div class="product">
      <h3>
        <a href="/page/categori?med=<?=$categori['id']?>"><?=$categori['name']?></a>
      </h3>
        <a href="/page/categori?med=<?=$categori['id']?>">
          <img src="<?=$categori['image']?>">
        </a>
    </div>
  <?php } ?>
  </div>
</div>