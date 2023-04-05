<section class="section d-flex chatBox w-full">
  <div class="chatBox-boxLeft d-flex w-full flex-dir-col" style="--bg-dark-url: url(/assets/dark_pattern.jpg); --bg-light-url: url(/assets/light_pattern.jpg);">
    
    <div class="userInfo w-full d-flex al-center f-noSharink jc-spaceBetween relative">
      <div class="userInfo-avatar d-flex pointer">
        <div class="chatItemAvatar" style="--bg-user-url: url(/assets/icon_user_story.png); width: 40px; height: 40px;"></div>
        <div class="info d-flex flex-dir-col jc-center">
          <span>d</span> 
          <span>s</span>
        </div>
      </div>
      <div class="userInfo-action d-flex">
        <div>
          <i class="material-symbols-outlined actionBtn btnSearchBox al-center jc-center pointer">search</i>
        </div>
        <div style="position: relative; ">
          <i class="material-symbols-outlined actionBtn btnToggleMenu al-center jc-center pointer" data-id="userInfoMenu">more_vert</i>
          <ul class="toggleMenu absolute" id="userInfoMenu" style="--currentBottom: -160px; --currentLeft: -140px; --bottom: -130px; --left: -140px; --width: 170px;">
            <li class="d-flex w-full"><i class="material-symbols-outlined">info</i> <span>View channel info</span></li>
            <li class="d-flex w-full"><i class="material-symbols-outlined">volume_mute</i> <span>Mute notifications</span></li>
            <li class="d-flex w-full btnLogout"><i class="material-symbols-outlined">logout</i> <span>Leave channel</span></li>
          </ul>
        </div>
      </div>
      <div class="searchBox chatBoxSearch w-full d-flex f-noSharink al-center absolute">
        <i class="material-symbols-outlined pointer">search</i><input type="text" name="search" placeholder="Search..." class="w-full h-full">
        <i class="material-symbols-outlined btnCloseSearchBox pointer">close</i>
      </div>
    </div>
    <div class="userChat w-full h-full">s</div>
    <div class="formSendMessage w-full d-flex f-noSharink">c</div>

  </div>
  <div class="chatBox-boxRight d-flex ">
    b4
  </div>
</section>