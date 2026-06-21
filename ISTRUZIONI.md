# Benessere in Movimento — Istruzioni

Il sito ora è "a blocchi": tutti i testi e le immagini di ogni pagina vivono nei file dentro `content/` (in formato JSON) e vengono caricati automaticamente dalle pagine HTML tramite JavaScript. Questo è ciò che permette al pannello di amministrazione di funzionare.

## 1. Anteprima in locale (prima del deploy)

Da quando il sito legge i contenuti da file esterni, **non basta più il doppio click su index.html**: i browser bloccano per sicurezza il caricamento di file locali via `fetch()`. Per vedere il sito in locale serve un mini server:

```
cd bim-site
python3 -m http.server 8000
```

Poi apri `http://localhost:8000` nel browser. (Se non hai Python, va bene anche l'estensione gratuita "Live Server" di VS Code, o `npx serve`.)

Una volta online su Netlify questo problema non esiste più: funzionerà semplicemente visitando il sito.

## 2. Metti il sito online con il pannello di gestione

Il pannello (Decap CMS) richiede un repository **GitHub** + hosting **Netlify** (entrambi gratuiti).

### A. Crea il repository GitHub
1. Vai su github.com → crea un account se non ne hai uno → "New repository" (puoi chiamarlo `benessere-in-movimento`, privato o pubblico).
2. Carica tutto il contenuto della cartella `bim-site` in questo repository (puoi anche solo trascinare i file dalla pagina web di GitHub: "Add file" → "Upload files").

### B. Collega Netlify
1. Vai su netlify.com → registrati (puoi accedere direttamente con l'account GitHub).
2. "Add new site" → "Import an existing project" → scegli il repository appena creato.
3. Lascia vuoti i campi di build (non serve nessun comando di build, è già tutto pronto) e clicca "Deploy".
4. Dopo un minuto il sito sarà online con un indirizzo tipo `nome-a-caso.netlify.app` (potrai collegare il vostro dominio vero in un secondo momento, da Netlify → Domain settings).

### C. Attiva login e salvataggio per il pannello
1. Nel pannello Netlify del sito: **Site configuration → Identity → Enable Identity**.
2. Sempre in Identity, sezione **Registration**: impostala su "Invite only" (così solo chi invitate può accedere).
3. Scendi a **Services → Git Gateway → Enable Git Gateway**.
4. Torna su Identity → **Invite users** → inserisci l'email di Giada. Lei riceverà una mail per impostare la password.

### D. Accesso di Giada al pannello
Una volta fatto questo, Giada potrà andare su:

```
https://vostro-sito.netlify.app/admin
```

accedere con email e password, e modificare ogni blocco del sito: testi, immagini, orari dei corsi, recensioni, contatti — tutto tramite un semplice modulo, senza toccare codice. Ogni modifica salvata aggiorna automaticamente il sito online in 1-2 minuti.

## 3. Struttura dei contenuti (per chi tocca i file a mano)

```
content/
  site.json          → contatti, social, footer (presenti su tutte le pagine)
  home.json          → testi e immagini della Home
  chisono.json       → testi e immagini della pagina Chi sono
  corsi.json         → elenco corsi, con orari/luoghi/tag
  eventi.json        → testi e immagini di Eventi & Formazione
  testimonials.json  → tutte le recensioni
```

Ogni pagina HTML carica il proprio file tramite uno script in `assets/js/page-*.js`. Se modifichi questi JSON a mano (senza pannello), basta salvare e ricaricare la pagina.

## 4. Dominio personalizzato

Quando avrete acquistato il dominio, da Netlify → **Domain settings → Add a custom domain** e seguite le istruzioni per puntare i DNS.
