/* Locale preference + path switching for /de/ and /en/. */
(function (global) {
  var KEY = "dashday.lang";

  function preferred() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === "de" || stored === "en") return stored;
    } catch (e) {}
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    return String(nav).toLowerCase().startsWith("de") ? "de" : "en";
  }

  function setPreferred(lang) {
    if (lang !== "de" && lang !== "en") return;
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
  }

  function redirectRoot() {
    location.replace("/" + preferred() + "/");
  }

  /** @param {string} page e.g. "privacy/" or "support/" or "impressum/" */
  function redirectLegacy(page) {
    var lang = preferred();
    if (page.indexOf("impressum") === 0 && lang === "en") {
      // Impressum is German legal text; keep under /de/ unless /en/impressum exists.
    }
    location.replace("/" + lang + "/" + page.replace(/^\//, ""));
  }

  function localePath(lang) {
    var path = location.pathname || "/";
    var replaced = path.replace(/^\/(de|en)(?=\/|$)/, "/" + lang);
    if (replaced === path) {
      if (path === "/" || path === "") {
        replaced = "/" + lang + "/";
      } else {
        replaced = "/" + lang + (path.startsWith("/") ? path : "/" + path);
      }
    }
    if (!replaced.endsWith("/") && !replaced.split("/").pop().includes(".")) {
      replaced += "/";
    }
    return replaced + location.search + location.hash;
  }

  function switchTo(lang) {
    setPreferred(lang);
    location.href = localePath(lang);
  }

  function wireSwitcher() {
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        switchTo(el.getAttribute("data-lang"));
      });
    });
  }

  global.DashdayI18n = {
    preferred: preferred,
    setPreferred: setPreferred,
    redirectRoot: redirectRoot,
    redirectLegacy: redirectLegacy,
    switchTo: switchTo,
    localePath: localePath,
    wireSwitcher: wireSwitcher,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireSwitcher);
  } else {
    wireSwitcher();
  }
})(window);
