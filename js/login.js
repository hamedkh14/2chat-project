$('.btnLogin').click(function (e) { 
  e.preventDefault();
  let phoneInput = $("#phoneInput").val();

  if(phoneInput != '' && typeof (phoneInput * 1) == 'number' && phoneInput.length == 11) {
    $('.verifyField').css({height: '50px', opacity: 1});
    $('.verifyField input#verifyCodeInput').focus();
    $(this).hide();
    $('.btnConfirm').show();
  }
});