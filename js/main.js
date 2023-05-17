const user = JSON.parse(localStorage.getItem('user'));
let chatList;
let xhr;

(function() {
  localStorage.removeItem('currentChat');
  localStorage.removeItem('lastMessageTime');
})()

let docWidth = $(window).width();
$(window).resize(function () { 
  docWidth = $(window).width();
});

// Secure
if(user === null) {
  window.location = '/';
}

// Mode Settings
function handleDarkMode() {
  if(localStorage.getItem("themeMode")) {
    if(localStorage.getItem("themeMode") == 'dark') {
      $('body').removeClass('light').addClass('dark');
    }else {
      $('body').removeClass('dark').addClass('light');
    }
  }else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      $('body').removeClass('light').addClass('dark');
    }else {
      $('body').removeClass('dark').addClass('light');
    }
  }
}
handleDarkMode();

$('.changeMode').click(function() {
  if($('body').hasClass('dark')) {
    $('body').removeClass('dark').addClass('light');
    localStorage.setItem("themeMode", "light");
  }else {
    $('body').removeClass('light').addClass('dark');
    localStorage.setItem("themeMode", "dark");
  }
});


// Toggle Menu
$('.btnToggleMenu').click(function() {
  let id = $(this).attr('data-id');
  if($(`#${id}`).hasClass('active')) {
    $(`#${id}`).removeClass('active');
  }else {
    $(`#${id}`).addClass('active');
  }
});


var target = $('.folderChat').get(0);
$('body').on('wheel', function (e)
{
    var o = e.originalEvent;
    target.scrollLeft += o.deltaX;
});
var lastTouch = null;
window.addEventListener('touchstart', function (event)
{
    lastTouch = event.touches[0];
})
window.addEventListener('touchend', function (event)
{
    lastTouch = null;
})
window.addEventListener('touchmove', function (event)
{
    var currentTouch = event.changedTouches[0];
    if (lastTouch)
        {
            target.scrollLeft += lastTouch.clientX - currentTouch.clientX;
        }
    lastTouch = currentTouch;
});

// Search Box
$('.btnSearchBox').click(function() {
  $('.chatBoxSearch').css({opacity: 1, visibility: 'visible'});
});
$('.btnCloseSearchBox').click(function() {
  $('.chatBoxSearch').css({opacity: 0, visibility: 'hidden'});
});

// Emoji
$('.btnBoxEmoji').click(function() {
  $('.emojiBox').slideToggle();
});
$('.appendEmoji').click(function() {
  let emoji = $(this).attr('data-emoji');
  $('#input').append(emoji);
});

// Toggle info 
$('.btnToggleInfo').click(function() {
  changeChatInfo();
  toggleInfo();
});
$('.boxRight-top').on('click', '.btnToggleInfo', function() {
  changeChatInfo();
  toggleInfo();
});

function toggleInfo(status = 'toggle') {
  const close = () => {
    $('.chatBox-boxRight').css({right: '-100%', display: 'none'});
  }

  const open = () => { 
    let rightNum = '16';
    if(docWidth <= 750) rightNum = '0';
    $('.chatBox-boxRight').css({right: `${rightNum}px`, display: 'flex'});
  }

  let display = $('.chatBox-boxRight').css('display');

  if(status == 'close') {
    close();
    return;
  }

  if(display == 'none') {
    open();
  }else {
    close();
  }
}

// Toggle Menu bar 
$('.btnShowMenubar').click(function() {
  $('.navbar-boxLeft').css({left: '16px'});
});
$(document).click(function(e) {
  let target = e.target;
  if(!$(target).parent().hasClass('btnShowMenubar')) {
    $('.navbar-boxLeft').css({left: '-100%'});
  }
});
$('.navbar-boxLeft').click(function(event) {
  event.stopPropagation();
});

// Chat list
$('.chatList').on('click', '.chatItem', function() {
  $('.chatItem').removeClass('active');
  $(this).addClass('active');
  localStorage.setItem('currentChat', JSON.stringify(chatList[$(this).attr('data-id')]));
  localStorage.removeItem('lastMessageTime');
  getMessage(1);
  changeProfile();
  toggleInfo('close');
  online();
});

// Scroll Chat Box Handle
var scrolled = false;
$('.userChat').scroll(function() {
  const scrollHeight = $('.userChat').prop("scrollHeight");
  const scrollTop = $('.userChat').scrollTop() + $('.userChat').height();

  if(scrollTop < scrollHeight) scrolled = true;
  else scrolled = false;
});

function scrollHandle() {
  if(scrolled) return;

  const scrollHeight = $('.userChat').prop("scrollHeight");
  $('.userChat').scrollTop(scrollHeight);
}

$('.btnMsgFile').click(function() {
  $('.attachFile').toggleClass('show');
  online();
});

$('.getLocation').click(function() {
  // بررسی پشتیبانی مرورگر از مکان یابی
  if (navigator.geolocation) {
    // گرفتن موقعیت کاربر
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      // استفاده از موقعیت کاربر
      console.log("موقعیت کاربر: " + latitude + ", " + longitude);
    });
  } else {
    // در صورتی که مرورگر پشتیبانی نکند
    alert("مرورگر شما از مکان‌یابی پشتیبانی نمی‌کند.");
  }
});

// Change profile
function changeProfile() {
  const userInfo = JSON.parse(localStorage.getItem('currentChat'));
  const profile = `
                <div class="chatItemAvatar" style="--bg-user-url: url(/assets/icon_user_story.png); width: 40px; height: 40px;"></div>
                <div class="info d-flex flex-dir-col jc-center">
                  <span>${userInfo.fullName}</span> 
                  <span>${userInfo.online}</span>
                </div>
              `;
  $('.userInfo-avatar').html(profile);
  online();
}

// Change Chat Info
function changeChatInfo() {
  const userInfo = JSON.parse(localStorage.getItem('currentChat'));
  const info = `
                <i class="material-symbols-outlined btnClose btnToggleInfo pointer">close</i>
                <div class="chatItemAvatar" style="--bg-user-url: url(/assets/icon_user_story.png); width: 80px; height: 80px;"></div>
                <div class="info d-flex flex-dir-col al-center">
                  <span class="userName">${userInfo.fullName}</span> 
                  <span class="onlineTime">${userInfo.online}</span>
                </div>
              `;
  $('.boxRight-top').html(info);

  const bio = `
                <div class="descItem d-flex flex-dir-col">
                  <span>${userInfo.phoneNumber}</span>
                  <label>mobile</label>
                </div>
                <div class="descItem d-flex flex-dir-col">
                  <span>${userInfo.bio}</span>
                  <label>bio</label>
                </div>
                <div class="descItem d-flex flex-dir-col">
                  <span class="userName">@${userInfo.userName}</span>
                  <label>Username</label>
                </div>
              `;
  $('.bio').html(bio);
  online();
}

// Ajax
function getChatList() {
  $.post('/getChatList', {userId: user.id}, function(data) {
    chatList = JSON.parse(data);
    $('.chatListLoading').fadeOut(0);
    $('.chatList').html('');

    chatList.forEach((item, index) => {
      const divElement = document.createElement('div');
      divElement.classList.add('chatItem', 'w-full', 'd-flex', 'pointer');
      divElement.setAttribute('data-id', index);

      if(JSON.parse(localStorage.getItem('currentChat'))?.id == item.id) divElement.classList.add('active');

      divElement.innerHTML = `
        <div class="chatItemAvatar d-flex f-noSharink relative" style="--bg-user-url: url(/assets/icon_user_story.png)">${item.online == 'Online' ? '<div class="userStatus absolute"></div>' : ''}</div>
        <div class="chatItemContent d-flex flex-dir-col w-full jc-center">
          <div class="w-full userName">${item.fullName}</div>
          <div class="w-full lastMessage d-flex jc-spaceBetween"><div>${item.lastMessage}</div><div class="f-noSharink msgSeen"><i class="material-symbols-outlined">done_all</i></div></div>
        </div>
      `;

      $('.chatList').append(divElement);
    });
  });

  setTimeout(getChatList, 2000);
}
getChatList();

function getFileSize(url)
{
  var fileSize = '';
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false); // false = Synchronous

  http.send(null); // it will stop here until this http request is complete

  // when we are here, we already have a response, b/c we used Synchronous XHR

  if (http.status === 200) {
      fileSize = http.getResponseHeader('content-length');
      return (parseInt(fileSize, 10) / 1024 / 1024).toFixed(1);
  }

  return 0;
}

function getMessage(newChat = 0) {
  const lastMessageTime = ( ( !newChat && localStorage.getItem('lastMessageTime') )  || 0);
  $('.userInfo').removeClass('d-none').addClass('d-flex');
  $('.formSendMessage').removeClass('d-none').addClass('d-flex');
  xhr = $.post('/getMessages', {userId: user.id, contactId: JSON.parse(localStorage.getItem('currentChat')).id, lastMessageTime: lastMessageTime}, (data) => {
    if(newChat) $('.userChat').html('');
    $('.typing').remove();

    const messages = JSON.parse(data);
    messages.forEach((msgGroup) => {

      divElement = document.createElement('div');
      divElement.classList.add('userMessage', (msgGroup[0].id_sender == user.id ? 'chatRight' : 'chatLeft'), 'd-flex', 'w-full');
      if(msgGroup[0].typing) divElement.classList.add('typing');

      divElement.innerHTML = `
        <div class="chat-box1 d-flex">
          <div class="chatItemAvatar" style="--bg-user-url: url(/assets/icon_user_story.png); width: 40px; height: 40px;"></div>
        </div>
        <div class="chat-box2 d-flex flex-dir-col"></div>
      `;
      
      msgGroup.forEach((msg) => {
        if(msg.typing) {
          const msgDivElement = document.createElement('div');
          msgDivElement.classList.add('message', 'w-full', 'd-flex', 'flex-dir-col');

          msgDivElement.innerHTML = `
                          <div class="msgBody w-full">
                            <div class="msgText w-full">
                              <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                          </div>
                        `;
          divElement.children[1].appendChild(msgDivElement);
          return;
        }

        const msgDivElement = document.createElement('div');
        msgDivElement.classList.add('message', 'w-full', 'd-flex', 'flex-dir-col');

        const date = new Date(msg.dateCreate * 1000);
        localStorage.setItem('lastMessageTime', msg.dateCreate);

        msgDivElement.innerHTML = `
                          <div class="msgHeader d-flex jc-spaceBetween">
                            <div class="msgSendBy">${ (msg.id_sender == user.id ? 'You' : JSON.parse(localStorage.getItem('currentChat')).fullName) }</div>
                            <div class="msgDetails"></div>
                          </div>
                          <div class="msgBody w-full">
                            <div class="msgText w-full">
                              ${
                                
                                (msg.type == "video" ? `
                                                <video width="100%" height="240" controls>
                                                  <source src="/assets/attachment/videos/${msg.fileLink}" type="video/mp4">
                                                </video>
                                              ` 
                                : msg.type == "audio" ? `
                                                <audio controls>
                                                  <source src="/assets/attachment/audio/${msg.fileLink}" type="audio/mpeg">
                                                </audio>
                                              `
                                : msg.type == "image" ? `
                                                <img src="/assets/attachment/images/${msg.fileLink}" width="100%">
                                              `
                                : msg.type == "file" ? `
                                                <div class="download d-flex w-full">
                                                  <a href="/assets/attachment/files/${msg.fileLink}" download class="d-flex f-noSharink"><div class="d-flex al-center jc-center f-noSharink"><i class="material-symbols-outlined">download</i></div></a>
                                                  <div class="d-flex w-full flex-dir-col jc-spaceBetween">
                                                    <div class="fileTitle">${msg.fileLink}</div>
                                                    <div class="fileSize">${getFileSize(`/assets/attachment/files/${msg.fileLink}`)}MB</div>
                                                  </div>
                                                </div>
                                              `
                                : msg.message)

                              }
                            </div>
                          </div>
                          <div class="msgFooter d-flex jc-spaceBetween">
                            <div class="msgSeen">
                              <i class="material-symbols-outlined">done_all</i>
                            </div>
                            <div class="msgTime d-flex">
                              <div class="d-flex">
                                <span>20</span>
                                <i class="material-symbols-outlined">visibility</i>
                              </div>
                              <div class="d-flex">
                                ${ date.getHours() + ":" + date.getMinutes() }
                              </div>
                            </div>
                          </div>
                        `;
        divElement.children[1].appendChild(msgDivElement);
      })
      $('.userChat').append(divElement);
    })
    
    setTimeout(getMessage, 1000);
    scrollHandle()
  });
  checkOnline();
}


// Send Message
$('.sendMSG').click(sendMessage);

function sendMessage() {
  const message = $('#input').html();
  const attachVideo = $('input[name=attachVideo]')[0].files;
  const attachAudio = $('input[name=attachAudio]')[0].files;
  const attachImage = $('input[name=attachImage]')[0].files;
  const attachDoc = $('input[name=attachDoc]')[0].files;

  if(message == "" && attachVideo.length == 0 && attachAudio.length == 0 && attachImage.length == 0 && attachDoc.length == 0) return false;
  
  const formData = new FormData();
  formData.append('message', message);
  if(attachVideo.length) formData.append('attachVideo', attachVideo[0]);
  if(attachAudio.length) formData.append('attachAudio', attachAudio[0]);
  if(attachImage.length) formData.append('attachImage', attachImage[0]);
  if(attachDoc.length) formData.append('attachDoc', attachDoc[0]);
  
  formData.append('id_sender', user.id);
  formData.append('id_receiver', JSON.parse(localStorage.getItem('currentChat')).id);
  $.ajax({
    type: "post",
    url: '/sendMessage',
    data: formData,
    contentType: false,
    processData: false,
    success: (data) => {}
  })
  online();
}

// Typeing user
$('.textInput').on('input', function() {
  $.post('/typing', {id_sender: user.id, id_receiver: JSON.parse(localStorage.getItem('currentChat')).id}, function(data) {});
  online();
});

// Online user
function online() {
  $.post('/online', { userId: user.id });
}

// Check online user
function checkOnline() {
  let currentChat = JSON.parse(localStorage.getItem('currentChat'));
  $.post('/checkOnline', { currentChatId: currentChat.id }, function(data) {
    currentChat.online = data;
    localStorage.setItem('currentChat', JSON.stringify(currentChat));
  });

  changeProfile();
  const userInfo = JSON.parse(localStorage.getItem('currentChat'));
  const info = `
                <i class="material-symbols-outlined btnClose btnToggleInfo pointer">close</i>
                <div class="chatItemAvatar" style="--bg-user-url: url(/assets/icon_user_story.png); width: 80px; height: 80px;"></div>
                <div class="info d-flex flex-dir-col al-center">
                  <span class="userName">${userInfo.fullName}</span> 
                  <span class="onlineTime">${userInfo.online}</span>
                </div>
              `;
  $('.boxRight-top').html(info);
}