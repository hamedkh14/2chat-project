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
  