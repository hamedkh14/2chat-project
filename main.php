<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="/assets/favicon.png" type="image/x-icon">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/main.css">
  <script src="/include/jquery-3.6.3.min.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  
  <title>2 Chat</title>
</head>
<body class="light">
  <main class="d-flex">
    <section class="section navbar d-flex f-noSharink">
      <?php include('temple/navbar_menu.php') ?>
      <div class="navbar-boxRight d-flex flex-dir-col">
        <?php include('temple/story.php') ?>
        <?php include('temple/chat_list.php') ?>
      </div>
    </section>
    <?php include('temple/chat_box.php') ?>
  </main>
  <script src="/js/main.js"></script>
</body>
</html>