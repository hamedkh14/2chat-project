function sendSms(e) {
  $('.timer').hide().html('Send Again: <span></span>'); 

  let phoneInput = $("#phoneInput").val();
  let target = $(this);
  let minute = 1;
  let second = 59;
  let timer;

  if(phoneInput != '' && typeof (phoneInput * 1) == 'number' && phoneInput.length == 11) {
    $.post('/sendSms', {phone: phoneInput}, function(data) {
      console.log(data)
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
  let codeInput = $('.verifyCode').val();
  let phoneInput = $("#phoneInput").val();

  if(codeInput != '' && typeof (codeInput * 1) == 'number') {
    $.post('/confirmCode', {code: codeInput, phone: phoneInput}, function(data) {
      console.log(data);
    })
  }
}

$('.btnLogin').click(sendSms);
$('.btnConfirm').click(confirmCode);

function sendAgain() {
  $('.timer').html(`<a onClick=sendSms()>send Again</a>`);
}