# dashday-page

Statische Website für [dashday.io](https://dashday.io).

| Path | Inhalt |
|------|--------|
| `/` | Sprachweiche (Browser + gespeicherte Wahl → `/de/` oder `/en/`) |
| `/de/`, `/en/` | Landing (SEO-Hauptseiten) |
| `/de/support/`, `/en/support/` | Support-FAQ |
| `/de/privacy/`, `/en/privacy/` | Datenschutz / Privacy Policy |
| `/de/impressum/`, `/en/impressum/` | Impressum (DE verbindlich, EN Kurzfassung) |
| `/privacy/`, `/support/`, `/impressum/` | Legacy-Redirects auf die Locale-URLs |
| `/robots.txt`, `/sitemap.xml` | Indexierung |
| `/assets/demo/` | Kurzes Demo-Video |
| `/auth/…`, `.well-known/…` | Auth / Universal Links (nicht lokalisiert) |

## App Store CTA

Sobald die App live ist, in `assets/store-config.js` setzen:

```js
window.DashdayStore = {
  iosUrl: "https://apps.apple.com/app/dashday/id6796732065",
  macUrl: null,
  appId: "6796732065",
};
```

Ohne URL zeigt die Seite „Bald im App Store“ / TestFlight.

## SEO / Indexierung

1. Nach Deploy: [Google Search Console](https://search.google.com/search-console) → Property `dashday.io` → Sitemap `https://dashday.io/sitemap.xml` einreichen
2. URL-Prüfung für `https://dashday.io/de/` und `/en/` anstoßen

## GitHub Pages

1. Settings → Pages → Source: **Deploy from a branch**
2. Branch: `main`, folder: `/` (root)
3. Custom domain: `dashday.io` (`CNAME` liegt im Repo)

Die Adresse `hello@dashday.io` wird in `assets/contact.js` zur Laufzeit zusammengesetzt (`[data-mail=support]`).
