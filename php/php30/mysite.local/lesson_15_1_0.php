<?php
  echo '<pre>';
  print_r ($_SERVER); // массив с настройками php сервера и клиент который подключился на наш сайт (опач в основном)
  echo '</pre>';
  echo '<br />-------------<br />';

  phpinfo(); // выводит списон настроек и расширений php на сервере

  // менять настройки сервера php, включать расширения в ручную можно в файле php.ini (в опенсервере это дополнительно -> конфигурация -> php 8)

?>