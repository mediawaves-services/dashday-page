(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Demo video: play when scrolled into view, pause when leaving.
  var demoVideos = document.querySelectorAll("video[data-autoplay-on-scroll]");
  if (demoVideos.length && "IntersectionObserver" in window) {
    var demoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            video.muted = true;
            var play = video.play();
            if (play && typeof play.catch === "function") play.catch(function () {});
          } else if (!entry.isIntersecting) {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.45, 0.75] }
    );
    demoVideos.forEach(function (video) {
      demoObserver.observe(video);
    });
  }

  var header = document.getElementById("site-header");
  if (!header) return;

  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = header.querySelector(".nav-toggle");
  var nav = header.querySelector(".nav");
  if (!toggle || !nav) return;

  if (!nav.id) nav.id = "site-nav";
  toggle.setAttribute("aria-controls", nav.id);
  toggle.setAttribute("type", "button");

  var setOpen = function (open) {
    header.classList.toggle("is-nav-open", !!open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.classList.toggle("nav-open", !!open);
  };

  var toggleMenu = function (e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(!header.classList.contains("is-nav-open"));
  };

  // click covers mouse + iOS tap; avoid relying on :hover alone
  toggle.addEventListener("click", toggleMenu);

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener(
    "click",
    function (e) {
      if (!header.classList.contains("is-nav-open")) return;
      if (header.contains(e.target)) return;
      setOpen(false);
    },
    true
  );

  window.addEventListener(
    "resize",
    function () {
      if (window.matchMedia("(min-width: 721px)").matches) setOpen(false);
    },
    { passive: true }
  );
})();
