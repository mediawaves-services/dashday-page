(function () {
  const cfg = window.DashdayStore || {};
  const iosUrl = cfg.iosUrl || null;
  const testFlightUrl = cfg.testFlightUrl || null;

  function apply(root) {
    const live = root.querySelectorAll("[data-store-live]");
    const soon = root.querySelectorAll("[data-store-soon]");
    const testflight = root.querySelectorAll("[data-store-testflight]");
    const links = root.querySelectorAll("[data-store-ios]");
    const tfLinks = root.querySelectorAll("a[data-store-testflight]");

    if (iosUrl) {
      live.forEach((el) => {
        el.hidden = false;
      });
      soon.forEach((el) => {
        el.hidden = true;
      });
      testflight.forEach((el) => {
        el.hidden = true;
      });
      links.forEach((el) => {
        el.setAttribute("href", iosUrl);
        el.removeAttribute("aria-disabled");
      });
      return;
    }

    live.forEach((el) => {
      el.hidden = true;
    });

    if (testFlightUrl) {
      testflight.forEach((el) => {
        el.hidden = false;
      });
      tfLinks.forEach((el) => {
        el.setAttribute("href", testFlightUrl);
        el.setAttribute("rel", "noopener");
        el.removeAttribute("data-mail");
      });
      soon.forEach((el) => {
        el.hidden = true;
      });
      return;
    }

    testflight.forEach((el) => {
      el.hidden = true;
    });
    soon.forEach((el) => {
      el.hidden = false;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => apply(document));
  } else {
    apply(document);
  }
})();
