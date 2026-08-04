(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

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

  var setOpen = function (open) {
    header.classList.toggle("is-nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-nav-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener(
    "resize",
    function () {
      if (window.matchMedia("(min-width: 721px)").matches) setOpen(false);
    },
    { passive: true }
  );
})();
