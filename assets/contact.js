/* Assembles support email at runtime so scrapers don't get a plain mailto in HTML. */
(function () {
  function supportAddress() {
    return [104, 101, 108, 108, 111, 64, 100, 97, 115, 104, 100, 97, 121, 46, 105, 111]
      .map(function (c) {
        return String.fromCharCode(c);
      })
      .join("");
  }

  function fillMails() {
    var addr = supportAddress();
    document.querySelectorAll("[data-mail=support]").forEach(function (el) {
      var subject = el.getAttribute("data-subject");
      var href =
        "mailto:" + addr + (subject ? "?subject=" + encodeURIComponent(subject) : "");
      var label = el.getAttribute("data-label");

      if (el.tagName === "A") {
        el.setAttribute("href", href);
        if (label) {
          el.textContent = label;
        } else if (!el.textContent.trim()) {
          el.textContent = addr;
        }
        return;
      }

      var a = document.createElement("a");
      a.href = href;
      a.textContent = label || addr;
      if (el.className) {
        a.className = el.className;
      }
      el.replaceWith(a);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillMails);
  } else {
    fillMails();
  }
})();
