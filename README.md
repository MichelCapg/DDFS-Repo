# DDFS · Team-Intro (15 s Motion Graphics)

15-Sekunden-Video als Team-Intro und Pitch für Kunden: **Data-Driven Financial Services (DDFS), Capgemini Invent**.

| Datei | Inhalt |
| --- | --- |
| `output/DDFS_Team-Intro_15s.mp4` | Finales Video – 1920×1080, 60 fps, H.264 + AAC-Stereo (-14 LUFS) |
| `output/DDFS_Team-Intro_poster.jpg` | Standbild der Endcard (Thumbnail/Vorschaubild) |
| `motion/ddfs-motion.html` | Quelle: Animation (Canvas) + Sounddesign (Web Audio), mit Live-Vorschau |
| `motion/render.mjs` | Export Frame für Frame → MP4 (Playwright + ffmpeg) |

## Storyboard

Alle Schnitte liegen auf einem 120-BPM-Raster (ein Beat = 0,5 s), Bild und Ton nutzen dieselben Cue-Zeiten.

| Zeit | Szene | Bild | Ton |
| --- | --- | --- | --- |
| 0,0–2,0 | **Intro** | Scan-Linie öffnet sich, Datenpunkte laufen als Welle durchs Bild, „DDFS“ entschlüsselt sich Buchstabe für Buchstabe | Riser, digitale Glitches, Ticks beim Einrasten, Impact bei 1,0 s, ab hier läuft der Beat |
| 2,0–3,5 | **Team** | 26 Knoten bauen ein Netzwerk auf, Zähler läuft bis 26 („Köpfe. Ein Team.“), Leads Marcel Walter & André Kühn werden hervorgehoben | Zoom-Whoosh, ein Tick pro Knoten mit steigender Tonhöhe, zwei Blips für die Leads |
| 3,5–6,5 | **Kernkompetenzen** | Iris in „Daten“ (Balken + Linienchart) → schräger Wipe zu „Versicherung & Banking“ (Schild + Bank) → Glitch-Schnitt zu „AI“ (neuronales Netz) | Whoosh-Wechsel, Pops, Glitch + kurzer Impact für AI |
| 6,5–7,0 | **Recap** | Triptychon: alle drei Kompetenzen nebeneinander | drei gestaffelte Pops |
| 7,0–8,5 | **Tools** | Glas-Karten n8n · Otera · Claude, die n8n-Karte wird hervorgehoben und füllt den Screen | Pops/Klicks pro Karte, Whoosh beim Aufziehen |
| 8,5–11,5 | **Highlight n8n** | Das n8n-Icon fliegt ins Highlight-Label, ein Workflow startet: Eingang → Extraktion → KI-Analyse → Entscheidung → Kernsystem (+ Experte als Human-in-the-Loop), danach weitere Fälle im Durchlauf | Pentatonische Blips bei jeder Aktivierung, „Erfolg“-Chime, leises Ticken im Durchlauf |
| 11,5–13,5 | **Kunden** | Heller Kontrast-Look, Logo-Wand: LBBW, Commerzbank, Allianz, ERGO, Sparkassen-Finanzgruppe | Wipe-Whoosh, Ticks pro Name, Riser zum Finale |
| 13,5–15,0 | **Endcard** | „Ihr erster Ansprechpartner für Daten & AI.“ + DDFS | Capgemini Invent | Großer Impact, Schlussakkord, Glanz, Ausklang |

**Design:** Capgemini-Palette (Capgemini Blue `#0070AD`, Vibrant Blue `#12ABDB`, Deep Purple `#2B0A3D`, Akzent Zest Green `#95E616` für Erfolg) und die Hausschrift **Ubuntu** (+ Ubuntu Mono für die technischen HUD-Elemente).
**Sound:** komplett synthetisiert (Web Audio, keine Fremd-Samples, also auch keine Lizenzfragen): dezentes Musikbett in d-Moll (Dm–B♭–F–C) mit Kick, Hi-Hats und Bass, dazu Whooshes, Impacts, Riser, UI-Ticks und Blips genau auf den Animationen.

## Vorschau und neu rendern

Voraussetzungen: Node.js ≥ 18 und `ffmpeg` im `PATH`.

```bash
npm install                 # installiert Playwright (Chromium ggf. mit: npx playwright install chromium)
npm run preview             # Live-Vorschau mit Ton und Scrubber unter http://localhost:8080/ddfs-motion.html
npm run render              # finales MP4 → output/DDFS_Team-Intro_15s.mp4 (ca. 3 Min.)
npm run render:draft        # schneller Entwurf mit 30 fps
node motion/render.mjs --still 14.95 --out poster.png        # einzelnes Standbild
node motion/render.mjs --remux --out output/DDFS_Team-Intro_15s.mp4   # nur den Ton neu erzeugen
```

## Anpassen

* **Texte und Inhalte**: Objekt `CONTENT` am Anfang von `motion/ddfs-motion.html` (Team, Leads, Tools, Workflow-Schritte, Kunden).
* **Timing**: Objekt `T` (Szenenstarts). Die Sound-Cues hängen an denselben Werten.
* **Echte Kundenlogos**: Die Kunden werden aktuell als einheitliche Wortmarken gesetzt. Liegt eine Logo-Datei unter dem Pfad aus `CONTENT.clients[].logo` (z. B. `motion/assets/logos/lbbw.png`, am besten dunkel/monochrom mit transparentem Hintergrund, weil die Szene hell ist), ersetzt sie die Wortmarke beim nächsten Rendern automatisch. Bitte vorher die Freigabe der Kunden für die Logo-Nutzung klären.
* **Tool-Icons** (n8n, Otera, Claude) sind bewusst abstrakte Symbole und keine Markenlogos.

Schriften: Ubuntu Font Family, Ubuntu Font Licence 1.0 (`motion/assets/fonts/UBUNTU-FONT-LICENCE.txt`).
