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


// Account Menu
$('.userAvatar-img').click(function() {
  if($('.userAvatar-menu').hasClass('active')) {
    $('.userAvatar-menu').removeClass('active');
  }else {
    $('.userAvatar-menu').addClass('active');
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
  console.log(1)
    lastTouch = event.touches[0];
})
window.addEventListener('touchend', function (event)
{
  console.log(1)
    lastTouch = null;
})
window.addEventListener('touchmove', function (event)
{
  console.log(1)
    var currentTouch = event.changedTouches[0];
    if (lastTouch)
        {
            target.scrollLeft += lastTouch.clientX - currentTouch.clientX;
        }
    lastTouch = currentTouch;
});

