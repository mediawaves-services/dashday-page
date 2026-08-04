/* Locale preference + path switching for /de/ and /en/. */
(function (global) {
  var KEY = "dashday.lang";

  function langFromPath(pathname) {
    var m = String(pathname || "").match(/^\/(de|en)(?=\/|$)/);
    return m ? m[1] : null;
  }

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

  /** Keep preference aligned with the page the user is actually viewing. */
  function syncFromLocation() {
    var lang = langFromPath(location.pathname);
    if (lang) setPreferred(lang);
    return lang;
  }

  function redirectRoot() {
    location.replace("/" + preferred() + "/");
  }

  /** @param {string} page e.g. "privacy/" or "support/" or "impressum/" */
  function redirectLegacy(page) {
    location.replace("/" + preferred() + "/" + page.replace(/^\//, ""));
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
        var lang = el.getAttribute("data-lang");
        if (lang !== "de" && lang !== "en") return;
        setPreferred(lang);
        var href = el.getAttribute("href");
        if (href && href.charAt(0) === "/") {
          e.preventDefault();
          location.href = href;
          return;
        }
        e.preventDefault();
        switchTo(lang);
      });
    });
  }

  /** Rewrite absolute legacy links (/support/, /privacy/, …) to the active locale. */
  function rewriteLegacyNavLinks() {
    var lang = preferred();
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      if (href === "/") {
        a.setAttribute("href", "/" + lang + "/");
        return;
      }
      var legacy = href.match(/^\/(support|privacy|impressum)\/?(#.*)?$/);
      if (legacy) {
        a.setAttribute("href", "/" + lang + "/" + legacy[1] + "/" + (legacy[2] || ""));
      }
    });
  }

  global.DashdayI18n = {
    preferred: preferred,
    setPreferred: setPreferred,
    syncFromLocation: syncFromLocation,
    redirectRoot: redirectRoot,
    redirectLegacy: redirectLegacy,
    switchTo: switchTo,
    localePath: localePath,
    wireSwitcher: wireSwitcher,
    rewriteLegacyNavLinks: rewriteLegacyNavLinks,
  };

  function boot() {
    syncFromLocation();
    wireSwitcher();
    rewriteLegacyNavLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);
