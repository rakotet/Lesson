<?php
  // \laraveltest.local\config - папка с конфигурационными файлами
  // \laraveltest.local\.env - тоже файл с настройками проэкта
  // \laraveltest.local\config\app.php - в нем ф-я env считывает параметры из файла \laraveltest.local\.env
  // \laraveltest.local\.env ниже нужные настройки этого конфиг файла для app.php
  /*
  APP_ENV=local - при разработке local на хостинге нужно менять на production
  APP_DEBUG=true - вывод ошибок, соответственно на хостинге делаем false
  APP_URL=http://mysite.local/Laravel/laraveltest.local/public/ - путь к файлу index.php самого laravel

  \laraveltest.local\config\app.php ниже нужные настройки этого конфиг файла
  'locale' => 'ru', - по умолчанию en, выбор вкакой локили будет работать laravel
  'faker_locale' => 'ru_Ru', - по умолчанию en, служба которая наполняет базу данных тестовыми данными в заданной локали языка

  */
?>