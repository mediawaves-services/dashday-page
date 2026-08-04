# dashday-page

Statische Website für [dashday.io](https://dashday.io).

| Path | Inhalt |
|------|--------|
| `/` | Sprachweiche (Browser + gespeicherte Wahl → `/de/` oder `/en/`) |
| `/de/`, `/en/` | Landing |
| `/de/support/`, `/en/support/` | Support-FAQ |
| `/de/privacy/`, `/en/privacy/` | Datenschutz / Privacy Policy |
| `/de/impressum/`, `/en/impressum/` | Impressum (DE verbindlich, EN Kurzfassung) |
| `/privacy/`, `/support/`, `/impressum/` | Legacy-Redirects auf die Locale-URLs |
| `/auth/…`, `.well-known/…` | Auth / Universal Links (nicht lokalisiert) |

App Store / App-Links:

- DE Support: `https://dashday.io/de/support/`
- EN Support: `https://dashday.io/en/support/`
- DE Privacy: `https://dashday.io/de/privacy/`
- EN Privacy: `https://dashday.io/en/privacy/`

Alte URLs `/privacy/` und `/support/` leiten weiter (Browser-Sprache bzw. `localStorage`).

Die Adresse `hello@dashday.io` wird in `assets/contact.js` zur Laufzeit zusammengesetzt (`[data-mail=support]`).

## GitHub Pages

1. Settings → Pages → Source: **Deploy from a branch**
2. Branch: `main`, folder: `/` (root)
3. Custom domain: `dashday.io` (`CNAME` liegt im Repo)
