<?php
  namespace App\View\Composers;

  use Illuminate\View\View;
use stdClass;

  class DzComposer {
    public function compose(View $view) {
      $basket = new stdClass();
      $basket->number = 5;
      $basket->sum = 458;
      $view->with('basket', $basket);
    }
  }
?>