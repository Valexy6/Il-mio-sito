# PRD — valerioballarò.it
**Versione:** 1.0  
**Data:** 23 giugno 2026  
**Autore:** Valerio Ballaró

---

## 1. Panoramica

Sito personale di Valerio Ballaró — sviluppatore, maker e creativo. Il sito ha tre anime:

1. **Portfolio / presentazione** — chi sei, cosa fai, come contattarti
2. **Shop** — vendita diretta di oggetti stampati in 3D e T-shirt personalizzate
3. **Ordini su misura** — form per ricevere richieste custom

Tutto in italiano. Tono diretto, ironico, personale.

---

## 2. Obiettivi

| Obiettivo | Metrica di successo |
|-----------|-------------------|
| Comunicare identità e competenze | Tempo medio sulla pagina > 1 min |
| Ricevere richieste di ordini custom | Form compilati / mese |
| Vendere prodotti dello shop | Click su "Acquista" → conversioni |
| Essere memorabile e originale | Niente template, tutto fatto a mano |

---

## 3. Utenti target

- **Clienti maker** — cercano oggetti 3D unici o T-shirt personalizzate
- **Potenziali collaboratori / clienti dev** — vogliono capire chi sei prima di scriverti
- **Curiosi notturni** — arrivano tardi, si aspettano risposta rapida

---

## 4. Struttura delle sezioni

### 4.1 Header / Nav
- Logo `VB` con punto colorato
- Link: About me · Shop · Ordine al buio · Ordini · Contatti
- Sticky, minimale

### 4.2 Hero
- Titolo grande con nome e cognome
- Tagline: "Scrivo codice. Stampo idee. Qualche volta le indosso."
- CTA primario → Shop, secondario → Ordini personalizzati
- Elemento visivo: bandiera One Piece con Jolly Roger animata (SVG inline, wave filter)

### 4.3 Marquee
- Strip animata con parole chiave: Codice · Stampa 3D · T-Shirt · Maker · Insonnia · Fatto a mano

### 4.4 Chi sono
- Testo breve in due paragrafi
- Tre "soul card": Dev / Stampa 3D / T-Shirt
- Callout "Dovresti sapere che" con immagine occhi sgranati e testo sull'insonnia creativa

### 4.5 Shop
- Due categorie: Oggetti stampati in 3D · T-shirt personalizzate
- Grid 4 prodotti per categoria (8 totali)
- Ogni card: immagine placeholder · nome · descrizione · prezzo · bottone "Acquista"
- Badge per: Ed. limitata / Best seller / Fatto a mano / Pezzo unico / Su richiesta

**Prodotti attuali:**

| Categoria | Nome | Prezzo |
|-----------|------|--------|

| T-shirt | Layer Lines | €26 |


### 4.6 Ordine al buio
- Pagina separata (`buio.html`)
- Concept: non scegli tu, sceglie Valerio per te
- CTA: "Tenta la fortuna →"

### 4.7 Ordini su misura
- Form con: Nome · Email · Tipo prodotto (select) · Descrizione · Budget (range slider €10–€2000) · Allegato (opzionale)
- Stato di successo con messaggio personalizzato
- Validazione client-side

### 4.8 Contatti
- Email cliccabile
- Link social: Instagram · GitHub · LinkedIn
- Footer: tagline + crediti con tono ironico

---

## 5. Stack tecnico

| Aspetto | Scelta |
|---------|--------|
| Markup | HTML5 statico (no framework) |
| CSS | Variabili custom + 4 file separati (variables / base / layout / components) |
| JS | Vanilla — reveal.js (scroll animations) + form.js (validazione + submit) |
| Font | Display + Mono (da definire) |
| Colori principali | `--orange`, `--teal`, `--border`, sfondo scuro |
| Hosting | Da definire (GitHub Pages / Netlify / VPS) |
| Form backend | Da definire (Formspree / endpoint custom) |

---

## 6. Lavori in corso / TODO

### Must have
- [ ] Sostituire tutti i placeholder immagine con foto/render reali dei prodotti
- [ ] Collegare i bottoni "Acquista" (Stripe / link esterno / carrello)
- [ ] Collegare il form ordini a un backend reale (email / Notion / DB)
- [ ] Aggiungere link reali ai social
- [ ] Completare `buio.html` con logica "ordine casuale"
- [ ] SEO base: meta description, OG tags, favicon

### Nice to have
- [ ] Animazione hover sulle product card con anteprima prodotto
- [ ] Filtro categorie nello shop
- [ ] Pagina dettaglio prodotto
- [ ] Integrazione pagamento (Stripe Checkout)
- [ ] CMS leggero per gestire i prodotti senza toccare il codice
- [ ] Dark/light mode toggle

### Già fatto
- [x] Layout completo con tutte le sezioni
- [x] Animazioni scroll reveal
- [x] Marquee animato
- [x] Bandiera SVG animata nell'hero
- [x] Form con validazione client-side e stato di successo
- [x] Budget slider
- [x] Callout "insonnia" con immagine custom
- [x] Tono di voce coerente in tutto il sito

---

## 7. Tono di voce

- Diretto, senza fronzoli
- Ironico ma non caricaturale ("contribuisci al mio fondo melatonina")
- Personale: parla in prima persona
- Notturno / maker — l'insonnia è un tratto identitario, non un difetto

---

## 8. Identità visiva

- Palette scura con accenti teal e arancione
- Tipografia forte, uppercase per i titoli di sezione
- Elementi hand-crafted (SVG inline, badge manuali)
- Nessuna immagine stock — solo roba fatta da te
