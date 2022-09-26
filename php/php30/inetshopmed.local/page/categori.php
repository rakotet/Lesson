<?php
  require_once "../src/Base.php";

  $title = 'Категории';
  $content = '../html/categori';
  $catalog = $db->getCatalog('catalog');

  if($request->med) {
    $activ = $request->med;
    foreach($catalog as $catigori) {
      if($catigori['id'] == $activ) {
        $arrayCategori = $db->getCatalog($catigori['pseudonym']);
        $pseudonym = $catigori['pseudonym'];
      }
    }
  }

  require_once "../html/main.php";
?>