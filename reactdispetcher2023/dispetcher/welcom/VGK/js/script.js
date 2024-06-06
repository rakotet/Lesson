$(document).ready(function () {
   var button = $('#button-up');
   $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
         button.fadeIn();
      } else {
         button.fadeOut();
      }
   });
   button.on('click', function () {
      $('body, html').animate({
         scrollTop: 0
      }, 800);
      return false;
   });
});


$(".tabs__content").hide(); // скрываем содержимое всех вкладок
$(".tabs__content:first").fadeIn(); //показываем содерживмое второй вкладки
 
$('.tabs__item').on('click', function () {
$(this).addClass('tabs__link--active').siblings().removeClass('tabs__link--active'); //при клике по текущему элементу добавляем класс и удаляем этот класс у соседнего элемента если он есть
$('html,body').animate({scrollTop: $('html,body').get(0).scrollHeight / 8}, 500);
return false;
})

$('.tabs__link').click(function(e) {
    e.preventDefault(); //отменяем дефолтное действие
    $(".tabs__content").hide(); //скрываем контент вкладок
    $('#' + $(this).attr('data-title')).fadeIn(); //показываем вкладку с id соответствующем  содержимому  атрибута data-title текущего элемента
});

$(document).ready(function () {
   $(".arrow").click(function () {
      $(".recruitment-process").toggleClass("hidden");
      $(".arrow").toggleClass("rotate");
      if ($(".arrow").hasClass("rotate")) {
         $(".arrow").html("Свернуть раздел ↓");
      } else {
         $(".arrow").html("Показать раздел ↑");
      }
   });
});

$(document).ready(function () {
   $(".arrow-1").click(function () {
      $(".security-block").toggleClass("hidden-1");
      $(".arrow-1").toggleClass("rotate");
      if ($(".arrow-1").hasClass("rotate")) {
         $(".arrow-1").html("Свернуть раздел ↓");
      } else {
         $(".arrow-1").html("Показать раздел ↑");
      }
   });
});

$(document).ready(function () {
   $(".arrow-2").click(function () {
      $(".map-block").toggleClass("hidden-2");
      $(".arrow-2").toggleClass("rotate");
      if ($(".arrow-2").hasClass("rotate")) {
         $(".arrow-2").html("Свернуть раздел ↓");
      } else {
         $(".arrow-2").html("Показать раздел ↑");
      }
   });
});

$(document).ready(function () {
   $(".arrow-3").click(function () {
      $(".history-block").toggleClass("hidden-3");
      $(".arrow-3").toggleClass("rotate");
      if ($(".arrow-3").hasClass("rotate")) {
         $(".arrow-3").html("Свернуть раздел ↓");
      } else {
         $(".arrow-3").html("Показать раздел ↑");
      }
   });
});



// $(document).ready(function () {
//   $('.tabs-wrapper').each(function () {
//       let ths = $(this);
//       ths.find('.tab-item').not(':first').hide();
//       ths.find('.tab-border').click(function () {
//          ths.find('.tab-border').removeClass('active').eq($(this).index()).addClass('active');
//          ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
//       }).eq(0).addClass('active');
//   });
// });
