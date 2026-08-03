# dashday-page

Statische Website für [dashday.io](https://dashday.io).

| Path | Inhalt |
|------|--------|
| `/` | Landing (USPs + Apple-Integrationen) |
| `/privacy/` | Privacy Policy (DE/EN) |
| `/impressum/` | Impressum |
| `/assets/_m/a9f3e1c7/` | Auth-Mail Templates (JSON, von Edge Function geladen) |

Privacy-URL für Store / Google OAuth: `https://dashday.io/privacy/`

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
