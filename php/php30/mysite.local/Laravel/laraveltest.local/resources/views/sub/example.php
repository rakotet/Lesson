<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sub</title>
</head>
<body>
  <p>a: <?=$a?></p>
  <p>b: <?=$b?></p>
  <?php if(isset($composer_data)) { ?>
    <p>composer_data: <?=$composer_data?></p>
  <?php } ?>
  <p>Global_var: <?=$global_var?></p>
</body>
</html>