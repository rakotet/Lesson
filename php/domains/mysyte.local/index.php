<?php
if (isset($_POST['upload']))
    print_r($_FILES);
?>
<form name="upload" action="index.php" method="post" enctype="multipart/form-data">
    <p>
        <input type="file" name="im">
    </p>
    <p>
        <input type="submit" name="upload" value="Отправить">
    </p>
</form>
