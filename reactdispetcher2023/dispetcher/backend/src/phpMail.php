<?php
  require_once "./lib/vendor/autoload.php"; 
  use PHPMailer\PHPMailer\PHPMailer;

  function mailUser($topic, $htmlBody) {
    $mail = new PHPMailer;
    $mail->CharSet = "utf-8";
    $mail->SMTPDebug = 3;
    $mail->isSMTP();
    $mail->Host = "smtp-mail.outlook.com";
    $mail->SMTPAuth = true;
    $mail->Username = "disp8634@outlook.com";
    $mail->Password = "Piligrim34";
    $mail->SMTPSecure = "tls";
    $mail->Port = 587;
    $mail->From = "disp8634@outlook.com";
    $mail->FromName = "Диспетчеризация";
    $mail->addAddress("rakotet@gmail.com", "Имя получателя");
    $mail->isHTML(true);
    $mail->Subject = "$topic";
    $mail->Body = "<i>$htmlBody</i>";
    $mail->AltBody = "Текстовая версия письма";
  
    if(!$mail->send()) {
      echo "Ошибка: " . $mail->ErrorInfo;
    }  else {
      echo "Сообщение успешно отправлено";
     }
  }

  

?>