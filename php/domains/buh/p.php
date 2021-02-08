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

$result3[0] = $result1;
$result3[1] = $result2;

echo json_encode($result3, JSON_UNESCAPED_UNICODE);
