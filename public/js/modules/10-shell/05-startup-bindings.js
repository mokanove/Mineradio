function applyDesktopPlatformCapabilities() {
  var api = window.desktopWindow;
  var platform = api && String(api.platform || "");
  var isWindows = platform === "win32";
  document.body.classList.toggle("platform-windows", isWindows);
  document.body.classList.toggle(
    "platform-non-windows",
    !!platform && !isWindows,
  );
  if (!platform || isWindows) return;

  var wallpaperRow = document.querySelector(".wallpaper-engine-row");
  var wallpaperModal = document.getElementById("wallpaper-engine-modal");
  if (wallpaperRow) wallpaperRow.hidden = true;
  if (wallpaperModal) wallpaperModal.hidden = true;

  ["t-memoryAutoSystemTrim", "t-memorySystemAutoElevate"].forEach(
    function (id) {
      var element = document.getElementById(id);
      if (element) element.hidden = true;
    },
  );
  var memoryMask = document.getElementById("memory-mask-seg");
  if (memoryMask) memoryMask.hidden = true;
  ["fx-memory-interval", "fx-memory-threshold"].forEach(function (id) {
    var input = document.getElementById(id);
    var row = input && input.closest(".fx-slider");
    if (row) row.hidden = true;
  });
  document
    .querySelectorAll(".memory-action-row button")
    .forEach(function (button, index) {
      if (index > 0) button.hidden = true;
    });
  var memoryDescription = document.getElementById("memory-status-sub");
  if (memoryDescription) {
    memoryDescription.textContent = "后台压缩 Mineradio / Electron 进程工作集";
  }
}

applyDesktopPlatformCapabilities();
applyDiyMode(diyPlayerMode, { save: false });
bindFxPanel();
applySavedLyricPaletteState();
bindQualityControl();
bindAudioOutputControls();
bindVolumeControls();
initControlGlassSurface();
bindPlayerControlAnimations();
scheduleUiWarmTask(function () {
  updateControlGlassDisplacementMap();
  updateSearchBoxGlassDisplacementMap();
  updateSearchPillGlassDisplacementMap();
  try {
    if (renderer && renderer.compile && scene && camera)
      renderer.compile(scene, camera);
  } catch (e) {}
}, 900);
applyUserCapsuleAutoHideState();
applyFxFabAutoHideState();
initializeDesktopCloseBehavior();
applyStartupAutoplayUi();
applyControlsAutoHidePreference();
applyDesktopLyricsState(false);
applyWallpaperModeState(false);
setShelfMode(fx.shelf);
if (fx.shelf === "side") setShelfPinnedOpen(!!fx.shelfPinnedOpen, true, false);
var restoredPlaybackAtStartup = restoreLastPlaybackSnapshot();
applyStartupStarfieldPreset();
switchPlaylistTab(queueViewTab, {
  save: false,
  animate: false,
  refresh: false,
});
applyPlaylistPanelPinState(false);
if (fx.floatLayer) createFloatLayer();
if (fx.particleLyrics) createLyricsParticles();
if (fx.backCover) createBackCoverLayer();
initIdleGuideCanvas();
var startupLoginStatusPromise = Promise.all([
  refreshLoginStatus(),
  refreshQQLoginStatus({ forceVip: true, reason: "startup" }),
  refreshKugouLoginStatus(),
  refreshQishuiLoginStatus(),
  refreshSpotifyLoginStatus(),
]);
startQQLoginStatusAutoRefresh();
startKugouLoginStatusAutoRefresh();
startQishuiLoginStatusAutoRefresh();
startSpotifyLoginStatusAutoRefresh();
if (startupLoginStatusPromise && startupLoginStatusPromise.then) {
  startupLoginStatusPromise.then(
    function () {
      if (hasAnyPlatformLogin()) {
        refreshUserPlaylists(true);
        loadHomeDiscover(true);
      }
      if (restoredPlaybackAtStartup)
        queueStartupAutoplayAfterHomeReveal("login-status");
      if (document.body.classList.contains("splash-active")) return;
      var homeShown = updateEmptyHomeVisibility({
        forceLoad: hasAnyPlatformLogin(),
      });
      if (!hasAnyPlatformLogin()) maybeRunStartupLoginGuide("status");
      else if (!homeShown) maybeRunStartupLoginGuide("status");
    },
    function () {
      if (restoredPlaybackAtStartup)
        queueStartupAutoplayAfterHomeReveal("login-status");
    },
  );
} else if (restoredPlaybackAtStartup) {
  queueStartupAutoplayAfterHomeReveal("startup");
}
var collectNameInput = document.getElementById("collect-new-name");
if (collectNameInput) {
  collectNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      createPlaylistFromCollect();
    }
  });
}
var customLyricInput = document.getElementById("custom-lyric-input");
if (customLyricInput) {
  customLyricInput.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      saveCustomLyricForCurrent();
    }
  });
}
safeRenderQueuePanel("startup");
if (!restoredPlaybackAtStartup) {
  restoredPlaybackAtStartup = restoreLastPlaybackSnapshot();
  if (restoredPlaybackAtStartup)
    queueStartupAutoplayAfterHomeReveal("startup-restore");
}
safeRenderQueuePanel("startup-restore");
updateCustomCoverButton();
updateCustomLyricControls();
updateLikeButtons();
setTimeout(initUpdatePreview, 9000);
window.addEventListener("beforeunload", function () {
  saveLastPlaybackSnapshot(true, "beforeunload");
});

// ============================================================
//  主循环
