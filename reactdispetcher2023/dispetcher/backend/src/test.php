<?php
  // if (isset($_COOKIE["sso_session"])) {
  //   echo $_COOKIE["sso_session"];
  // } else {
  //   echo 'no';
  // }

  // $result = file_get_contents('http://sso.eurochem.ru/user_info?login=MatlashevskiiAA@suek.ru');
  // echo $result;

  //$result = file_get_contents('http://sso.eurochem.ru/user_info?login=EmelenchukEN@suek.ru');
  $result = file_get_contents('http://sso.eurochem.ru/user_info?login=');
  echo $result;
?>