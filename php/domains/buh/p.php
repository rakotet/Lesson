<?php

$user1 = file('1user.txt');
$num1 = file('1num.txt');
$result1 = [];
$user2 = file('2user.txt');
$num2 = file('2num.txt');
$result2 = [];
$result3 = [];

for ($i = 0; $i < count($user1); $i++) {
    $result1[$i] = [$user1[$i], $num1[$i]] ;
}

for ($i = 0; $i < count($user2); $i++) {
    $result2[$i] = [$user2[$i], $num2[$i]];
}

// for ($i = 0; $i < count($result1); $i++) {
//     $z = $result1[$i][$i];
//     for ($ii = 0; $ii < count($result2); $ii++) {
//         if($z == $result2[$ii][$ii]) {

//         }
//     }
// }

print_r($result2);
