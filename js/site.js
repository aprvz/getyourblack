(function () {
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.querySelector(".nav-panel");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    }
    if (open && panel) {
      var first = panel.querySelector("a");
      if (first) first.focus();
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  if (panel) {
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }

  document.querySelectorAll(".player").forEach(function (player) {
    var video = player.querySelector("video");
    var button = player.querySelector(".play");
    if (!video || !button) return;
    button.addEventListener("click", function () {
      var playPromise = video.play();
      if (playPromise && playPromise.catch) playPromise.catch(function () {});
    });
    video.addEventListener("play", function () {
      player.classList.add("is-playing");
    });
    video.addEventListener("pause", function () {
      if (video.ended || video.currentTime === 0) player.classList.remove("is-playing");
    });
    video.addEventListener("ended", function () {
      player.classList.remove("is-playing");
    });
  });

  var dialog = document.querySelector("dialog.lightbox");
  var dialogImg = dialog ? dialog.querySelector("img") : null;
  if (dialog && dialogImg) {
    document.querySelectorAll(".shot").forEach(function (shot) {
      shot.addEventListener("click", function () {
        var img = shot.querySelector("img");
        dialogImg.src = shot.getAttribute("data-full") || (img ? img.src : "");
        dialogImg.alt = img ? img.alt : "";
        if (dialog.showModal) dialog.showModal();
      });
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog || event.target.closest("[data-close]")) dialog.close();
    });
    dialog.addEventListener("close", function () {
      dialogImg.removeAttribute("src");
    });
  }
})();
