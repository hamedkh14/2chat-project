<?php
  $serverName = 'localhost';
  $userName = 'root';
  $password = '';
  $databaseName = '2chat';

  $conn = new mysqli($serverName, $userName, $password, $databaseName);

  if($conn->connect_error) {
    die('Server connection failed: ' . $conn->connect_error);
  }