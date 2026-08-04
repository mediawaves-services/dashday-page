# dashday-page

Statische Website für [dashday.io](https://dashday.io).

| Path | Inhalt |
|------|--------|
| `/` | Landing (USPs + Apple-Integrationen) |
| `/support/` | Support-FAQ (DE/EN), Kontakt per JS |
| `/privacy/` | Privacy Policy (DE/EN) |
| `/impressum/` | Impressum (Support-Mail per JS) |
| `/assets/_m/a9f3e1c7/` | Auth-Mail Templates (JSON, von Edge Function geladen) |

Privacy-URL: `https://dashday.io/privacy/`  
Support-URL: `https://dashday.io/support/`

Die Adresse `hello@dashday.io` wird in `assets/contact.js` zur Laufzeit zusammengesetzt (`[data-mail=support]`), damit sie nicht als Klartext-`mailto` im HTML steht.

## GitHub Pages

1. Settings → Pages → Source: **Deploy from a branch**
2. Branch: `main`, folder: `/` (root)
3. Custom domain: `dashday.io` (`CNAME` liegt im Repo)

DNS für Apex typisch GitHub Pages A-Records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
