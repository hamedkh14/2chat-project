<div class="navbar-boxLeft d-flex f-noSharink flex-dir-col al-center jc-spaceBetween">
  <div class="navbar-logo" style="--logo-url: url(/assets/logo-icon.png);"></div>

  <div class="navbar-middleButtons d-flex flex-dir-col">
    <button class="navbar-button pointer relative" style="--icon-dark: url(/assets/icon_groups.png); --icon-light: url(/assets/icon_groups_light.png); --bg-size: 65%;"><div class="tooltip">New Group</div></button>
    <button class="navbar-button pointer relative" style="--icon-dark: url(/assets/icon_channel.png); --icon-light: url(/assets/icon_channel_light.png); --bg-size: 65%;"><div class="tooltip">New Channel</div></button>
    <button class="navbar-button pointer relative" style="--icon-dark: url(/assets/icon_contacts.png); --icon-light: url(/assets/icon_contacts_light.png); --bg-size: 50%;"><div class="tooltip">Contacts</div></button>
    <button class="navbar-button pointer relative" style="--icon-dark: url(/assets/icon_settings.png); --icon-light: url(/assets/icon_settings_light.png); --bg-size: 55%;"><div class="tooltip">Settings</div></button>
  </div>

  <div class="navbar-account d-flex flex-dir-col">
    <button class="navbar-button pointer relative changeMode" style="--icon-dark: url(/assets/icon_light.png); --icon-light: url(/assets/icon_dark.png); --bg-size: 65%;"><div class="tooltip">Change Mode</div></button>

    <div class="userAvatar relative">
      <div class="userAvatar-img pointer btnToggleMenu" data-id="userAvatarMenu"></div>
      <ul class="toggleMenu absolute" id="userAvatarMenu" style="--currentBottom: 0; --currentLeft: 80px; --bottom: 0; --left: 50px; --width: 130px;">
        <li class="d-flex w-full"><i class="material-symbols-outlined">info</i> <span>Edit Profile</span></li>
        <li class="d-flex w-full"><i class="material-symbols-outlined">settings</i> <span>Settings</span></li>
        <li class="d-flex w-full btnLogout"><i class="material-symbols-outlined">logout</i> <span>Log Out</span></li>
      </ul>
    </div>
  </div>
</div>