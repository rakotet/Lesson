<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mypage</title>
</head>
<body>
  <?php foreach($clients as $client) { ?>
    <p>id: <?=$client->id?>, name: <?=$client->name?>, email: <?=$client->email?></p>
  <?php } ?>
  <br/>
  <p>В вашей корзине <?=$basket->number?> тов. на общую сумму <?=$basket->sum?> руб.</p>
</body>
</html>