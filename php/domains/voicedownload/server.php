<?php
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);
    $user = $data['name'];
    $date = $data['date'];

    function printDir($folder) { 
        $f = '';
        $files = scandir($folder); 
        foreach($files as $file) {
            if($file == '.' || $file == '..') continue; 
            $f = $folder.$file.';'.$f; 
        }
        return $f;
    }

    echo printDir('voice/');


