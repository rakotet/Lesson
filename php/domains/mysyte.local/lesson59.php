<?php
function test($from, $to) {
    for ($i = $from; $i < $to; $i++) {
        $cmd = yield $i;
        if ($cmd == -1) return 'Stop'; // если значение -1 останавливаем работу генератора
    }
    return $to - $from;
}

$t = test(1,  5); // получаем объект класса генератор
print_r($t);
echo '<br/>';

foreach ($t as $v) echo $v.'; '; // беребираем итератор генератора как массив
echo '<br/>';

echo $t->getReturn(); // метод позволяет получить значения которые возвращает генератор, а не только yield

echo '<br/>';

// следующий перебор тогоже генератора не возможен т.к. нельзя сдвинуть внутренний указатель генератора, но можно заново создать объект
$t = test(1,  5);

while ($t->valid()) { // valid проверяет существуел ли переменная и возвращает true или false
    echo $t->current().'; '; // получаем значение текущего элемента
    if ($t->current() == 2) $t->send(-1); // если значение элемента 2 то отправляем в генератор с помощью send значение -1
    $t->next(); // переходим к следущему элементу
}

echo '<br/>';

echo $t->getReturn(); // метод позволяет получить значения которые возвращает генератор, а не только yield

echo '<br/>';
