<?php
    function gener1() {
        echo '1';
        yield 1;
        echo '2';
        yield 2;
        echo '3';
        yield 3;
    }

    foreach(gener1() as $value) {
        echo "- из цыкла $value<br/>";
    }

    echo '<br/>';

    function gener2($from, $to) {
        for ($i = $from; $i < $to; $i++) {
            echo "$i - ";
            yield $i;
        }
    }

    foreach (gener2(1, 10) as $value) {
        echo "Удвоим: ".($value * 2).'<br/>';
    }

    echo '<br/>';

    function doubleArray ($arr, $callback) {
        foreach ($arr as $v) yield $callback($v);
    }
?>
