<?php
    $data = file_get_contents('php://input'); // ��������� ������
    $data = json_decode($data); // ����������� json
    echo $data->x ** 2; // �������� � ������� �������� �������