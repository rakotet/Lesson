<?php
    $ip_address = gethostbyname('set-k.ru'); // возвращает ip адрес по доменному имени
    echo $ip_address.'<br/>';

    $hostname = gethostbyaddr($ip_address); // возвращает доменное имя по ip адресу (часто работает не корректно т.к. на одном ip могут быть несколько сайтов или хостинг)
    echo $hostname.'<br/>';

    
?>