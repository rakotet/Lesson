<?php

$user1 = file('1user.txt');
$num1 = file('1num.txt');
$result1 = [];
$user2 = file('2user.txt');
$num2 = file('2num.txt');
$result2 = [];
$result3 = '123';

for ($i = 0; $i < count($user1); $i++) {
    $result1[$i] = [$user1[$i], $num1[$i]] ;
}

for ($i = 0; $i < count($user2); $i++) {
    $result2[$i] = [$user2[$i], $num2[$i]];
}

for ($i = 0; $i < count($result1); $i++) {
    
    for ($ii = 0; $ii < count($result2); $ii++) {
       
        if(mb_strtolower(trim($result1[$i][0])) == mb_strtolower(trim($result2[$ii][0]))) {
            $result3 = $result1[$i][0];
            if(mb_strtolower(trim($result1[$i][1])) == mb_strtolower(trim($result2[$ii][1]))) {
                $result3 = $result3.' - '.'yes'."\n";
            } else {
                $result3 = $result3.' '.$result1[$i][1].' '. $result2[$ii][1]."\n";
            }
        }
    }
    
}

echo '_____________________________________________'."<br/>";

echo $result3."<br/>";
$a = $result1[0][0];
$b = $result2[0][0];
if($a == $b) {
    echo 'yes';
} else {
    echo $result1[0][0].' - '.$result2[0][0];
}
