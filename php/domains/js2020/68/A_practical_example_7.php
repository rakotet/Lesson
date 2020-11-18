<?php
    if (isset($_POST['text'])) {
        $text = htmlspecialchars($_POST['text']);
        if (mb_strlen($text) == 0) echo '��� ���������';
        else {
            file_put_contents('chat.txt', file_get_contents('chat.txt') . "\n" . $text); // ���������� ��������� �� ����� � ����
            echo 'ok';
        }
    }
    else {
        $arr = explode("\n", file_get_contents('chat.txt')); // �-� � ������� ����������� ������ �� ����� ����������� � ������
        echo json_encode($arr); // �������� ������ � json � ������� �� ��������� �����
    }