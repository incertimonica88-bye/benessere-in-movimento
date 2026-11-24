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

## 3. Blocchi modulari ("Sezioni libere aggiuntive")

In ogni pagina (Home, Chi sono, Corsi, Eventi e Formazione, Contatti), in fondo al modulo del pannello, c'è una sezione **"Sezioni libere aggiuntive"**. Da lì Giada può aggiungere nuovi blocchi scegliendo tra 6 tipi pronti:

- **Testo + Immagine** (con immagine a sinistra o a destra)
- **Citazione**
- **Galleria foto**
- **Video** (incolla un link "embed" di YouTube o Vimeo)
- **Elenco punti**
- **Invito all'azione (CTA)**

Si possono aggiungere quanti blocchi si vuole, riordinarli con il trascina-rilascia dentro il pannello, ed eliminarli in qualsiasi momento — tutto senza toccare codice. Compaiono in fondo alla pagina, prima del riquadro finale di contatto.

Se in futuro serve un tipo di blocco diverso da questi 6 (es. una mappa, un modulo di prenotazione), va aggiunto via codice — scrivetemi e lo implemento.

## 4. Struttura dei contenuti (per chi tocca i file a mano)

```
content/
  site.json          → contatti, social, footer (presenti su tutte le pagine)
  home.json          → testi e immagini della Home
  chisono.json       → testi e immagini della pagina Chi sono
  corsi.json         → elenco corsi, con orari/luoghi/tag
  eventi.json        → testi e immagini di Eventi & Formazione
  contatti.json      → eventuali blocchi extra della pagina Contatti
  testimonials.json  → tutte le recensioni
```

Ogni pagina HTML carica il proprio file tramite uno script in `assets/js/page-*.js`. Se modifichi questi JSON a mano (senza pannello), basta salvare e ricaricare la pagina.

## 5. Dominio personalizzato

Quando avrete acquistato il dominio, da Netlify → **Domain settings → Add a custom domain** e seguite le istruzioni per puntare i DNS.

## 6. Vendita video on demand — configurazione decisa

Sezione di progetto, non ancora realizzata. Raccoglie le scelte fatte così da non doverle ridiscutere.

### Modello scelto

Video caricati su YouTube in modalità **Privato**, con invito per singolo indirizzo email.
Scelto perché protegge davvero: chi non è stato invitato non vede il video nemmeno con il link.
Si resta su questo modello finché i numeri lo consentono (previsti pochi acquirenti per video).

Pagamento tramite **link di pagamento PayPal**, uno per prodotto, incollato nel pulsante della scheda.
Il sito resta statico: nessun carrello, nessun database.

### La regola che conta: stessa email per comprare e per guardare

L'invito di YouTube è legato all'**account Google**, non all'indirizzo in sé.
Se una persona compra indicando un indirizzo e poi guarda il video mentre è connessa con un
account Google diverso — anche se entrambi sono Gmail — **non vede il video**.

È la causa quasi certa di ogni segnalazione "Video non disponibile": non un errore di
inserimento, ma l'accesso fatto con l'account sbagliato.

### Testo da mettere nel campo email del modulo d'acquisto

> Indirizzo email con cui guarderai le pratiche. Deve essere collegato a un account Google.
> Se non hai un indirizzo di questo tipo scrivimi.

Da mostrare **prima** del pagamento, non dopo.

### Se l'indirizzo non è collegato a Google

1. **Registrarlo come account Google.** Non serve aprire una casella Gmail: in fase di
   registrazione si può usare un indirizzo esistente, qualunque esso sia. Due minuti.
2. **Usare un altro indirizzo** che la persona ha già collegato a Google (spesso un vecchio
   Gmail aperto per il telefono Android).
3. **Eccezione una tantum:** consegnare quel singolo video via Google Drive con link riservato.
   La protezione cala, ma è un caso isolato e non cambia il sistema.

### Limiti noti di YouTube (da riverificare prima di partire)

- Massimo **50 indirizzi per video**. Irrilevante al volume previsto, ma è un tetto.
- L'invito è **per singolo video**: non esiste un invito a livello di playlist.
- Una **playlist non trasmette i permessi** ai video che contiene. Metterli in playlist non
  riduce il numero di inserimenti.
- I video privati **non si possono incorporare** nel sito: solo link che porta su YouTube.

Queste informazioni vengono da guide di terze parti, non dalla documentazione ufficiale, e su
un punto si contraddicono. **Prima di scrivere le istruzioni per le clienti: prova reale** —
caricare un video privato, invitare un proprio indirizzo non-Gmail, verificare cosa succede.

### Flusso operativo

Giada tiene un file con una riga per cliente: nome, cognome, email e i video acquistati.
Le colonne dei video devono contenere il **link**, non solo il titolo, per evitare abbinamenti
sbagliati fra pratiche dai nomi simili.

Serve una **casella di stato** per cella (data d'acquisto → sostituita da "fatto" + data):
senza, non è possibile sapere da dove ripartire fra una sessione e l'altra.

Gli inserimenti su YouTube Studio li esegue Claude dal browser, a lotti, quando Giada lo chiede.
Richiede che Giada sia connessa a YouTube in Chrome. Non è un processo automatico: non c'è modo
di accorgersi di un pagamento e agire da soli.

### Da chiarire prima di pubblicare

- Condizioni di vendita, diritto di recesso e rinuncia per i contenuti digitali, adempimenti
  fiscali: da verificare con il commercialista, incidono sui testi della pagina.
- Mockup dell'aspetto già approvato: `anteprima-shop.html` (bozza, noindex, da rimuovere a lavoro finito).
