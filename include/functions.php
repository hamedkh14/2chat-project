<?php
  // Query Select a field from a table row
  function sqlSelectOneField($tblname,$tblfield,$tblcondition="") {
    global $conn;
    $query = "SELECT * FROM $tblname $tblcondition";
    $sql = $conn->query($query);
    if($sql) {
      $result = $sql->fetch_assoc();
      return $result[$tblfield];
    }else {
      return $conn->error;
    }
  }
  
  // Query Select several table rows
  function sqlSelect($tblname,$tblfield="*",$tblcondition="") {
    global $conn;
    $query = "SELECT $tblfield FROM $tblname $tblcondition";
    $result = $conn->query($query);
    return $result;
  }
  
  // Query Update One or Multi row of Table
  function sqlUpdate($tblname,$tblfield,$tblcondition="") {
    global $conn;
    $query = "UPDATE $tblname SET $tblfield $tblcondition";
    if ($conn->query($query) === TRUE) {
      return TRUE;
    }else {
      return $conn->error;
    }
  }

  // Query Delete One or Multi row of Table
  function sqlDelete($tblname,$tblcondition) {
    global $conn;
    $query = "DELETE FROM $tblname $tblcondition";
    if ($conn->query($query) === TRUE) {
      return TRUE;
    }else {
      return $conn->error;
    }
  }

  // Query Insert into Table
  function sqlInsert($tblname,$fieldnames,$fieldvalues) {
    global $conn;
    $query = "INSERT INTO $tblname ($fieldnames) VALUES($fieldvalues)";
    if ($conn->query($query) === TRUE) {
      return $conn->insert_id;
    }else {
      return $conn->error;
    }
  }

  // Query count Rows
  function sqlNumRows($tblname,$tblcondition="") {
    global $conn;
    $query = "SELECT * FROM $tblname $tblcondition";
    $result = $conn->query($query);
    return $result->num_rows;
  }
  
  function sendsms($msg,$pattern,$number)
  {
    if($number[0]!="0") $number="0".$number;
    if(strlen($number)==11)
    {
      $client = new SoapClient("http://188.0.240.110/class/sms/wsdlservice/server.php?wsdl"); 
      $user = "09210711329"; 
      $pass = "vbji141376"; 
      $fromNum = "+983000505"; 
      $toNum = array($number); 
      $pattern_code = $pattern; 
      $input_data = $msg; 

      $client->sendPatternSms($fromNum,$toNum,$user,$pass,$pattern_code,$input_data);
    }
    else
    {
      return false;
    }
  }

  // convert timestamps to date
  function convertTimestamps($timestamp) {
    $currentTime = time() - $timestamp;
    $text = "";
    switch(1) {
      case $currentTime < 60:
        $text = "Online";
      break;
      case $currentTime < (60 * 3):
        $text = "a few moments ago";
      break;
      case $currentTime < (60 * 10):
        $text = floor(($currentTime / 60))." minutes ago";
      break;
      case $currentTime < (60 * 60 * 24):
        $text = date('H:i a', $timestamp);
      break;
      case $currentTime < (60 * 60 * 24 * 2):
        $text = 'Yesterday '.date('H:i a', $timestamp);
      break;
      default: 
        $text = 'a long time ago';
    }

    return $text;
  }
?>
  