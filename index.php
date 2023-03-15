<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="/assets/favicon.png" type="image/x-icon">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/index.css">
  <script src="/include/jquery-3.6.3.min.js"></script>
  <title>2 Chat</title>
</head>
<body class="light">

  <main>
    <div class="shapes shape1"></div>
    <div class="shapes shape2"></div>
    <div class="shapes shape3"></div>
    <div class="shapes shape4"></div>
    <div class="shapes shape5"></div>

    <div class="forms">
      <img src="/assets/logo2.png" width="180">
      <div class="formField">
        <label>
          <input type="number" name="phone" id="phoneInput" placeholder=" ">
          <span>Phone Number</span>
        </label>
      </div>
      <div class="formField verifyField">
        <label>
          <input type="number" name="verifyCode" id="verifyCodeInput" placeholder=" ">
          <span>Verification Code</span>
        </label>
      </div>
      <div class="formField formAction">
        <button class="buttons btnSubmit btnLogin"><span>LOGIN</span></button>
        <button class="buttons btnSubmit btnConfirm"><span>CONFIRM</span></button>
      </div>
    </div>
  </main>
  <script src="/js/login.js"></script>
</body>
</html>