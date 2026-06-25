# PRD -- valerioballaro.it
**Versione:** 2.0
**Data:** 25 giugno 2026
**Autore:** Valerio Ballaro

---

## 1. Panoramica

Sito personale di Valerio Ballaro -- sviluppatore, maker e creativo. Il sito ha tre anime:

1. **Portfolio / presentazione** -- chi sei, cosa fai, come contattarti
2. **Shop** -- vendita diretta di oggetti stampati in 3D e T-shirt personalizzate, con carrello e checkout Stripe
3. **Ordini su misura** -- form per richieste custom (stampe, t-shirt, siti web)

Tutto in italiano. Tono diretto, ironico, personale.

---

## 2. Obiettivi

| Obiettivo | Metrica di successo |
|-----------|-------------------|
| Comunicare identita e competenze | Tempo medio sulla pagina > 1 min |
| Ricevere richieste di ordini custom | Form compilati / mese |
| Vendere prodotti dello shop | Click "Aggiungi al carrello" -> conversioni Stripe |
| Essere memorabile e originale | Niente template, tutto fatto a mano |

---

## 3. Utenti target

- **Clienti maker** -- cercano oggetti 3D unici o T-shirt personalizzate
- **Potenziali collaboratori / clienti dev** -- vogliono capire chi sei prima di scriverti
- **Curiosi notturni** -- arrivano tardi, si aspettano risposta rapida

---

## 4. Struttura delle sezioni

### 4.1 Header / Nav
- Logo VB (assets/images/logo.png con sfondo trasparente)
- Link: About me - Shop - Ordine al buio - Ordini - Contatti
- Sticky, minimale
- Pulsante carrello con badge numerico

### 4.2 Hero
- Titolo grande + tagline: "Scrivo codice. Stampo idee. Qualche volta le indosso."
- CTA primario: Shop, secondario: Ordini personalizzati
- Layout a due colonne: testo a sinistra, mini-gioco **Insonnia Runner** a destra

#### Insonnia Runner (mini-gioco)
- Canvas 220x300px, vanilla JS
- Personaggio pixel che salta gli ostacoli (SPAZIO o click), doppio salto
- Game over: "Finalmente posso dormire."
- Difficolta progressiva
- Easter egg: bandiera One Piece nel footer

### 4.3 Marquee
- Strip animata: Codice - Stampa 3D - T-Shirt - Maker - Insonnia - Fatto a mano

### 4.4 Chi sono
- Testo in due paragrafi + tre "soul card": Dev / Stampa 3D / T-Shirt
- Callout "Dovresti sapere che" con testo sull'insonnia creativa

### 4.5 Shop

#### Oggetti stampati in 3D (3 prodotti + 1 card Personalizza)

| Nome | Descrizione | Prezzo |
|------|-------------|--------|
| Barca a vela | Simpatica e assolutamente inutile barca a vela da tenere sulla tua scrivania. | 13 EUR |
| Busto a cuore aperto | Busto a cuore aperto, cosi potrai sembrare un amante dell'arte e sembrerai meno noioso. | 18 EUR |
| Organizer Modulare | da definire | 16 EUR |
| Personalizza la tua statuetta | Mandami una foto, dimmi cosa vuoi e cerchero di accontentarti. | Su preventivo |

#### T-shirt personalizzate (3 prodotti + 1 card Personalizza)

| Nome | Descrizione | Prezzo |
|------|-------------|--------|
| Il volto del Nord | da definire | da definire |
| Fisico non mi tradire | da definire | 19 EUR |
| Debug Sleep Repeat | Non e una t-shirt, e uno stile di vita. | da definire |
| Personalizza la tua t-shirt | da definire | Su preventivo |

**Varianti t-shirt** su ogni card: Colore (Bianco/Nero), Taglia (S/M/L/XL), Genere (Uomo/Donna).
Il nome nel carrello codifica le varianti (es. "Il volto del Nord -- Uomo -- M -- Bianco").

**Lightbox**: cliccando l'immagine di una card si apre un ingrandimento a schermo intero.

### 4.6 Ordine al buio (buio.html)
- Non scegli tu, sceglie Valerio per te
- Prezzo fisso: 10 EUR / pezzo, selettore quantita, totale in tempo reale
- Checkout diretto via Stripe (senza carrello)
- Non si accettano resi

### 4.7 Ordini su misura
- Form: Nome - Email - Tipo (stampa 3D / t-shirt / sito web / altro) - Descrizione - Budget (slider 10-2000 EUR) - Allegato
- Invio via Formspree (https://formspree.io/f/xzdlzyjb)

### 4.8 Contatti e Footer
- Email: valerio.ballaroxy@gmail.com
- Link social: GitHub + LinkedIn (https://www.linkedin.com/in/valerio-ballaro-dev-web-danalyst/)
- Footer ironico + Easter egg nota + link note legali

---

## 5. Sistema di pagamento

### Carrello localStorage
- Key: vb_cart | Struttura: {id, name, price, quantity} | Prezzi in centesimi
- API: window.CartVB = { add, remove, increase, decrease, checkout }
- Drawer laterale + svuotamento automatico su success.html

### Stripe Checkout (api/checkout.js su Vercel)
- Secret key in env STRIPE_SECRET_KEY (mai nel codice)
- Spedizione: < 35 EUR = 5 EUR; >= 35 EUR = gratuita
- Raccolta: nome, indirizzo (IT + EU), email, telefono (facoltativo)
- Paesi: IT, DE, FR, ES, PT, AT, BE, NL, CH, GB, SE, DK, PL
- Redirect: successo -> /success.html, annulla -> /#shop

### Modal Personalizza
- Statuetta: allegato foto + descrizione
- T-shirt: colore / taglia / genere + descrizione
- Invio via Formspree

---

## 6. Stack tecnico

| Aspetto | Scelta |
|---------|--------|
| Markup | HTML5 statico, no framework |
| CSS | variables.css / base.css / layout.css / components.css |
| JS | Vanilla: reveal.js + form.js + cart.js + inline (game, modal, lightbox) |
| Mini-gioco | Canvas 2D inline in index.html |
| Hosting | Vercel |
| Pagamenti | Stripe Checkout live |
| Form backend | Formspree (xzdlzyjb) |
| Deploy | GitHub (https://github.com/Valexy6/Il-mio-sito.git) |

---

## 7. Pagine

| File | Descrizione |
|------|-------------|
| index.html | Pagina principale |
| buio.html | Ordine al buio -- checkout diretto Stripe |
| success.html | Conferma pagamento + svuota carrello |
| legal.html | Note legali complete |

---

## 8. Note legali (legal.html)

- Privacy Policy (GDPR, terze parti: Stripe/Formspree/Vercel)
- Cookie Policy (solo vb_cart localStorage, nessun tracciamento)
- Termini e Condizioni
- Spedizioni (costi, tempi, paesi)
- Resi e Rimborsi (14 gg, eccezioni per custom/buio)

Titolare: Valerio Ballaro, privato cittadino -- valerio.ballaroxy@gmail.com

---

## 9. Todo

- [ ] Immagine + descrizione per "Organizer Modulare" (16 EUR)
- [ ] Immagine + nome definitivo per la quarta t-shirt
- [ ] Prezzi mancanti: Il volto del Nord, Debug Sleep Repeat
- [ ] Completare verifica identita Stripe (documento + IBAN) per live payments
- [ ] OG image aggiornata per social preview
- [ ] Meta description ottimizzata

---

## 10. Gia fatto

- [x] Layout completo con tutte le sezioni
- [x] Animazioni scroll reveal + marquee animato
- [x] Mini-gioco Insonnia Runner (canvas vanilla JS)
- [x] Lightbox immagini prodotto
- [x] Carrello localStorage con drawer laterale
- [x] Stripe Checkout con spedizione condizionale (gratis >= 35 EUR)
- [x] Raccolta indirizzo + telefono al checkout
- [x] Varianti t-shirt (colore/taglia/genere) con encoding nel nome
- [x] Modal "Personalizza" per statuette e t-shirt
- [x] Ordine al buio con checkout diretto
- [x] success.html con svuotamento carrello
- [x] Note legali complete (legal.html)
- [x] Form ordini personalizzati con Formspree
- [x] Link LinkedIn
- [x] Easter egg bandiera nel footer

---

## 11. Tono di voce e identita visiva

- Diretto, ironico, personale -- parla in prima persona
- L'insonnia e un tratto identitario, non un difetto
- Palette scura con accenti teal e arancione
- Tipografia forte, uppercase per i titoli di sezione
- Nessuna immagine stock -- solo roba fatta da te
