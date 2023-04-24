function sendSms(e) {
  $('.timer').hide().html('Send Again: <span></span>'); 

  let phoneInput = $("#phoneInput").val();
  let target = $(this);
  let minute = 1;
  let second = 59;
  let timer;

  if(phoneInput != '' && typeof (phoneInput * 1) == 'number' && phoneInput.length == 11) {
    $.post('/sendSms', {phone: phoneInput}, function(data) {
      if(data == 1) {
        $('.verifyField').css({height: '50px', opacity: 1});
        $('.verifyField input#verifyCodeInput').focus();
        $(target).hide();
        $('.btnConfirm').show();

        timer = setInterval(() => {
          if(minute === 0 && second === 0) {
            clearInterval(timer);
            sendAgain();
            return;
          }

          if(second === 0) {
            minute--;
            second = 59;
          }else {
            second--;
          }

          $('.timer').show().children('span').text(`0${minute}:${ (second < 10 ? '0' + second : second) }`);
        }, 1000);
      }
    })
  }
}

function confirmCode() {
  let codeInput = $('#verifyCodeInput').val();
  let phoneInput = $("#phoneInput").val();

  if(codeInput != '' && typeof (codeInput * 1) == 'number') {
    $.post('/confirmCode', {code: codeInput, phone: phoneInput}, function(data) {
      data = data.split('***');
      localStorage.setItem('auth', data[1]);
      if(data[0]==2) {
        $('.step1').fadeOut(0);
        $('.step2').fadeIn();
        $('.timer').fadeOut(0);
      }else {
        window.location = '/main';
      }
    })
  }
}

function register() {
  let userName = $('#usernameInput').val();
  let firstName = $('#firstnameInput').val();
  let lastName = $('#lastnameInput').val();
  let phoneInput = $("#phoneInput").val();

  if(userName != '' && firstName != '' && lastName !='') {
    $.post('/register', {userName: userName, firstName: firstName, lastName: lastName, phone: phoneInput}, function(data) {
      if(data==2) {
        alert('The username is duplicate and you cannot register it.');
      }else if(data==1) {
        window.location = '/main';
      }
    });
  }
}

$('.btnLogin').click(sendSms);
$('.btnConfirm').click(confirmCode);
$('.btnRegister').click(register);

function sendAgain() {
  $('.timer').html(`<a onClick=sendSms()>send Again</a>`);
}