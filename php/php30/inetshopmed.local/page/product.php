<?php
  require_once "../src/Base.php";

  $title = 'Продукт';
  $content = '../html/product';
  
  if($request->med && $request->number) {
    $arrayProductData = $db->getProduct($request->med, [$request->number]);
    
  }

  require_once "../html/main.php";
?>