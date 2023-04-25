(function() {
  console.log(2)
  localStorage.removeItem('currentChat');
})()

let docWidth = $(window).width();
$(window).resize(function () { 
  docWidth = $(window).width();
});

// Secure
if(localStorage.getItem('auth') === null) {
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
  console.log(o);
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
  console.log(1)
  $('.chatBoxSearch').css({opacity: 1, visibility: 'visible'});
});
$('.btnCloseSearchBox').click(function() {
  console.log(1)
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
  if(docWidth <= 1250) {
    let rightNum = '16px';
    if(docWidth <= 750) rightNum = '0px';
    let rightPos = $('.chatBox-boxRight').css('right');
    if(rightPos != '16px' && rightPos != '0px') {
      $('.chatBox-boxRight').css({right: rightNum, display: 'flex'});
    }else {
      $('.chatBox-boxRight').css({right: '-100%', display: 'none'});
    }
  }else {
    let display = $('.chatBox-boxRight').css('display');
    if(display == 'none') {
      $('.chatBox-boxRight').css({right: '16px', display: 'flex'});
    }else {
      $('.chatBox-boxRight').css({right: '-100%', display: 'none'});
    }
  }
});

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
  localStorage.setItem('currentChat', $(this).attr('data-id'));
})

// Ajax
function getChatList() {
  console.log(1)
  $.post('/getChatList', {userId: localStorage.getItem('auth')}, function(data) {
    const items = JSON.parse(data);
    $('.chatListLoading').fadeOut(0);
    $('.chatList').html('');

    items.forEach((item) => {
      const divElement = document.createElement('div');
      divElement.classList.add('chatItem', 'w-full', 'd-flex', 'pointer');
      divElement.setAttribute('data-id', item.id);

      if(localStorage.getItem('currentChat') == item.id) divElement.classList.add('active');

      divElement.innerHTML = `
        <div class="chatItemAvatar d-flex f-noSharink relative" style="--bg-user-url: url(/assets/icon_user_story.png)">${(item.online * 1) == 1 ? '<div class="userStatus absolute"></div>' : ''}</div>
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