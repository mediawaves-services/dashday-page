(function () {
  const cfg = window.DashdayStore || {};
  const iosUrl = cfg.iosUrl || null;

  function apply(root) {
    const live = root.querySelectorAll("[data-store-live]");
    const soon = root.querySelectorAll("[data-store-soon]");
    const links = root.querySelectorAll("[data-store-ios]");

    if (iosUrl) {
      live.forEach((el) => {
        el.hidden = false;
      });
      soon.forEach((el) => {
        el.hidden = true;
      });
      links.forEach((el) => {
        el.setAttribute("href", iosUrl);
        el.removeAttribute("aria-disabled");
      });
    } else {
      live.forEach((el) => {
        el.hidden = true;
      });
      soon.forEach((el) => {
        el.hidden = false;
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => apply(document));
  } else {
    apply(document);
  }
})();
