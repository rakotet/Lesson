<?php
    set_include_path(get_include_path().PATH_SEPARATOR.'core');
    spl_autoload_extensions('_class.php');
    spl_autoload_register();

    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASSWORD', 'root');
    define('DB_NAME', 'mysite');
?>