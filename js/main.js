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

