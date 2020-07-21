<?php

//редирект
//header('Location: /a.php'); // посылает заголовки браузеру от имени сервера. в данном атрибуте мы делаем перенаправление на любые сайты и страницы
//exit; // всегда поле редиректа делаем exit

//запрет кэширования
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Cache-Control: post-check=0,pre-check=0", false);
header("Cache-Control: max-age=0", false);
header("Pragma: no-cache");

print_r(getallheaders()); // то что приходит на сервер от клиента