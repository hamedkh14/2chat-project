<div class="w-full bottomBox d-flex flex-dir-col h-full">
  <div class="folderChat w-full d-flex f-noSharink">
    <div class="folder d-flex al-center h-full pointer active">All</div>
  </div>
  <div class="chatList w-full d-flex flex-dir-col h-full">

    <div class="chatListLoading"><?php include('temple/loading.php') ?></div>

    <div class="chatItem w-full d-flex pointer active">
      <div class="chatItemAvatar d-flex f-noSharink relative" style="--bg-user-url: url(/assets/icon_user_story.png)"><div class="userStatus absolute"></div></div>
      <div class="chatItemContent d-flex flex-dir-col w-full jc-center">
        <div class="w-full userName">Hamed</div>
        <div class="w-full lastMessage d-flex jc-spaceBetween"><div>Hello my Freinds ...</div><div class="f-noSharink msgSeen"><i class="material-symbols-outlined">done_all</i></div></div>
      </div>
    </div>

    <div class="chatItem w-full d-flex pointer">
      <div class="chatItemAvatar d-flex f-noSharink relative" style="--bg-user-url: url(/assets/icon_user_story.png)"><div class="userStatus absolute"></div></div>
      <div class="chatItemContent d-flex flex-dir-col w-full jc-center">
        <div class="w-full userName">Hamed</div>
        <div class="w-full lastMessage d-flex jc-spaceBetween"><div>Hello my Freinds ...</div><div class="f-noSharink msgSeen"><i class="material-symbols-outlined">done_all</i></div></div>
      </div>
    </div>

    <div class="chatItem w-full d-flex pointer">
      <div class="chatItemAvatar d-flex f-noSharink relative" style="--bg-user-url: url(/assets/icon_user_story.png)"><div class="userStatus absolute"></div></div>
      <div class="chatItemContent d-flex flex-dir-col w-full jc-center">
        <div class="w-full userName">Hamed</div>
        <div class="w-full lastMessage d-flex jc-spaceBetween"><div>Hello my Freinds ...</div><div class="f-noSharink msgSeen"><i class="material-symbols-outlined">done_all</i></div></div>
      </div>
    </div>

  </div>
  <div class="searchBox w-full d-flex f-noSharink al-center">
    <i class="material-symbols-outlined pointer">search</i><input type="text" name="search" placeholder="Search..." class="w-full h-full">
  </div>
</div>