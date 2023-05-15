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
          
          $data = sqlSelect('users', 'id, name, family, phoneNumber, userName, active', 'where phoneNumber="'.$_POST['phone'].'" and tempPass="'.$_POST['code'].'"')->fetch_assoc();

          echo json_encode($data);
        }
      break;
      case 'register':
        if(sqlNumRows('users', 'where userName="'.$_POST['userName'].'"') != 0) {
          echo json_encode(["status"=> 2]);
        }else {
          sqlUpdate('users', 'userName="'.$_POST['userName'].'", name="'.$_POST['firstName'].'", family="'.$_POST['lastName'].'", active="1"', 'where phoneNumber="'.$_POST['phone'].'"');

          $data = sqlSelect('users', 'id, name, family, phoneNumber, userName, active', 'where phoneNumber="'.$_POST['phone'].'"')->fetch_assoc();

          echo json_encode($data);
        }
      break;
      case 'getChatList':
        $result = sqlSelect('messages', 'id_sender, id_receiver', 'where id_sender="'.$_POST['userId'].'" or id_receiver="'.$_POST['userId'].'" GROUP BY id_sender, id_receiver ORDER BY dateCreate DESC');
        $chatList = array();
        while($row = $result->fetch_assoc()) {
          $contactId = ($row['id_sender']!=$_POST['userId'] ? $row['id_sender'] : $row['id_receiver']);
          $userResult = sqlSelect('users', 'id, phoneNumber, bio, userName, IF( ( SELECT count(id) from phone_book where id_user="'.$_POST['userId'].'" and id_audience="'.$contactId.'" ), ( SELECT CONCAT(`name`, " ",`family`) from phone_book where id_user="'.$_POST['userId'].'" and id_audience="'.$contactId.'" ) , userName ) AS fullName, online, (SELECT message FROM messages where (id_sender="'.$_POST['userId'].'" and id_receiver="'.$contactId.'" and deleteBySender=0) or (id_sender="'.$contactId.'" and id_receiver="'.$_POST['userId'].'" and deleteByReceiver=0)  ORDER BY dateCreate DESC LIMIT 1) AS lastMessage', 'where id="'.$contactId.'"')->fetch_assoc();

          $idExist = false;
          foreach($chatList as $value) {
            if($value['id'] == $contactId) {
              $idExist = true;
              break;
            }
          }
          
          if(!$idExist && $userResult) $chatList[] = $userResult;
        }

        echo  json_encode($chatList);
      break;
      case 'getMessages':
        $result = sqlSelect('messages', '*', 'where ( (id_sender="'.$_POST['userId'].'" and id_receiver="'.$_POST['contactId'].'" and deleteBySender=0) or (id_sender="'.$_POST['contactId'].'" and id_receiver="'.$_POST['userId'].'" and deleteByReceiver=0) ) and dateCreate > '.$_POST['lastMessageTime'].' ORDER BY dateCreate ASC');
        $messages = array();
        $prevIdSender = 0;
        while($row = $result->fetch_assoc()) {
          if($prevIdSender != $row['id_sender']) {
            $messages[] = '';
          }

          $messages[count($messages) - 1][] = $row;

          $prevIdSender = $row['id_sender'];
        }

        if(sqlNumRows('users_typing', 'where id_sender="'.$_POST['contactId'].'" and id_receiver="'.$_POST['userId'].'" and date > ' . (time() - 10))) {
          $messages[][] = array("typing" => true);
        }

        echo json_encode($messages);
      break;
      case 'sendMessage':
        $result = sqlInsert('messages', 'id_sender, id_receiver, message, type, dateCreate', '"'.$_POST['id_sender'].'", "'.$_POST['id_receiver'].'", "'.$_POST['message'].'", "text", "'.time().'"');
        
        $direction = 'assets/attachment/';

        // Upload video
        if(isset($_FILES['attachVideo'])) {
          $filename = time() . '-' . basename($_FILES['attachVideo']['name']);
          $tmp_name = $_FILES['attachVideo']['tmp_name'];

          if(move_uploaded_file($tmp_name, $direction.'/videos/' . $filename)) {
            sqlInsert('messages', 'id_sender, id_receiver, fileLink, type, dateCreate', '"'.$_POST['id_sender'].'", "'.$_POST['id_receiver'].'", "'.$filename.'", "video", "'.time().'"');
          }
        }

        // Upload audio
        if(isset($_FILES['attachAudio'])) {
          $filename = time() . '-' . basename($_FILES['attachAudio']['name']);
          $tmp_name = $_FILES['attachAudio']['tmp_name'];

          if(move_uploaded_file($tmp_name, $direction.'/audio/' . $filename)) {
            sqlInsert('messages', 'id_sender, id_receiver, fileLink, type, dateCreate', '"'.$_POST['id_sender'].'", "'.$_POST['id_receiver'].'", "'.$filename.'", "audio", "'.time().'"');
          }
        }

        // Upload image
        if(isset($_FILES['attachImage'])) {
          $filename = time() . '-' . basename($_FILES['attachImage']['name']);
          $tmp_name = $_FILES['attachImage']['tmp_name'];

          if(move_uploaded_file($tmp_name, $direction.'/images/' . $filename)) {
            sqlInsert('messages', 'id_sender, id_receiver, fileLink, type, dateCreate', '"'.$_POST['id_sender'].'", "'.$_POST['id_receiver'].'", "'.$filename.'", "image", "'.time().'"');
          }
        }

        // Upload file
        if(isset($_FILES['attachDoc'])) {
          $filename = time() . '-' . basename($_FILES['attachDoc']['name']);
          $tmp_name = $_FILES['attachDoc']['tmp_name'];

          if(move_uploaded_file($tmp_name, $direction.'/files/' . $filename)) {
            sqlInsert('messages', 'id_sender, id_receiver, fileLink, type, dateCreate', '"'.$_POST['id_sender'].'", "'.$_POST['id_receiver'].'", "'.$filename.'", "file", "'.time().'"');
          }
        }

        echo $tmp_name;
      break;
      case 'typing':
        sqlDelete('users_typing', 'where date < '.(time() - 10));
        if(sqlNumRows('users_typing', 'where id_sender="'.$_POST['id_sender'].'" and id_receiver="'.$_POST['id_receiver'].'"')) {
          sqlUpdate('users_typing', 'date="'.time().'"', 'where id_sender="'.$_POST['id_sender'].'" and id_receiver="'.$_POST['id_receiver'].'"');
        }else {
          sqlInsert('users_typing', 'id_sender, id_receiver, date', '"'.$_POST['id_sender'].'", "'.$_POST['id_receiver'].'", "'.time().'"');
        }

      break;
    }
  }
?>