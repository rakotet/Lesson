<?php

$user1 = file('1user.txt');
$num1 = file('1num.txt');
$result1 = [];
$user2 = file('2user.txt');
$num2 = file('2num.txt');
$result2 = [];
$result3 = '';

for ($i = 0; $i < count($user1); $i++) {
    $result1[$i] = [$user1[$i], $num1[$i]] ;
}

for ($i = 0; $i < count($user2); $i++) {
    $result2[$i] = [$user2[$i], $num2[$i]];
}

for ($i = 0; $i < count($result1); $i++) {
    $x = 0;
    for ($ii = 0; $ii < count($result2); $ii++) {
        $y = 0;
        if($result1[$i][$x] == $result2[$ii][$y]) {
            $result3 = $result1[$i][$x];
            if($result1[$i][$x + 1] == $result2[$ii][$y + 1]){
                $result3 = $result3.' - '.'yes'."\n";
            } else {
                $result3 = $result3.' '.$result1[$i][$x + 1].' '. $result2[$ii][$y + 1]."\n";
            }
        }
    }
    
}

echo $result3;
