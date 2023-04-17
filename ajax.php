<?php
  include('include/config.php');
  include('include/functions.php');
  include('include/jdf.php');
  if(isset($_GET['act'])) {
    switch($_GET['act']) {
      case 'sendSms':
        // Generate random number
        $randomNumber = rand(1000, 10000);
        while(1) {
          if(sqlNumRows('users', 'where tempPass="'.$randomNumber.'" and tempPassDate>'.time()) == 0) {
            break;
          }

          $randomNumber = rand(1000, 10000);
        }
        
        if(sqlNumRows('users', 'where phoneNumber="'.$_POST["phone"].'"') == 0) {
          sqlInsert('users', 'phoneNumber, tempPass, tempPassDate, active', '"'.$_POST["phone"].'", "'.$randomNumber.'", "'.(time() + (60*2)).'", "2"');
        }else {
          sqlUpdate('users', 'tempPass="'.$randomNumber.'" , tempPassDate="'.(time() + (60*2)).'"', 'where phoneNumber="'.$_POST['phone'].'"');
        }

        
        if(sqlSelectOneField('users', 'active', 'where phoneNumber="'.$_POST['phone'].'"')) {
          $sms_msg = array( "code" => $randomNumber);
          $pattern_code = "cdf57fhgrv4r54x";
          sendsms($sms_msg,$pattern_code,$_POST['phone']);
          echo 1;
        }else {
          echo 0;
        }
      break;
      case 'confirmCode':
        if(sqlNumRows('users', 'where phoneNumber="'.$_POST['phone'].'" and tempPass="'.$_POST['code'].'" and tempPassDate>'.time()) == 1) {
          $_SESSION['userId'] = sqlSelectOneField('users', 'id', 'where phoneNumber="'.$_POST['phone'].'" and tempPass="'.$_POST['code'].'"');

          if(sqlSelectOneField('users', 'active', 'where phoneNumber="'.$_POST['phone'].'"')==2) {
            echo 2;
          }else {
            echo 1;
          }
        }
      break;
    }
  }
?>