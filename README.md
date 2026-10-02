# DDFS · Team-Intro (24 s Motion Graphics)

24-Sekunden-Video als Team-Intro und Pitch für Kunden: **Data-Driven Financial Services (DDFS), Capgemini Invent**.

| Datei | Inhalt |
| --- | --- |
| `output/DDFS_Team-Intro_24s.mp4` | Finales Video – 1920×1080, 60 fps, H.264 + AAC-Stereo (-14 LUFS) |
| `output/DDFS_Team-Intro_poster.jpg` | Standbild der Endcard (Thumbnail/Vorschaubild) |
| `motion/ddfs-motion.html` | Quelle: Animation (Canvas) + Sounddesign (Web Audio), mit Live-Vorschau |
| `motion/render.mjs` | Export Frame für Frame → MP4 (Playwright + ffmpeg) |

## Storyboard

Alle Schnitte liegen auf einem 120-BPM-Raster (ein Beat = 0,5 s). Die Szenen sind auf einer 15-s-Design-Timeline animiert und werden über die Tabelle `WARP` auf 24 s Laufzeit gedehnt: längere Standzeiten, ruhigeres Tempo. Bild und Ton nutzen dieselben Cue-Zeiten.

| Zeit | Szene | Bild | Ton |
| --- | --- | --- | --- |
| 0–3 s | **Intro** | Scan-Linie öffnet sich, Datenpunkte laufen als Welle durchs Bild, „DDFS“ entschlüsselt sich Buchstabe für Buchstabe | Riser, Glitches, Ticks, Impact bei 1,5 s, ab hier läuft der Beat |
| 3–5,5 s | **Team** | 26 Knoten bauen ein Netzwerk auf („26 Experts. One Team.“), Leads Marcel Walter & André Kühn | Zoom-Whoosh, ein Tick pro Knoten, zwei Blips für die Leads |
| 5,5–10 s | **Expertise** | „Data“ → „Insurance & Banking“ → „AI“, jede Kompetenz mit eigener Farbwelt und eigenem Übergang | Whooshes, Pops, Glitch + kurzer Impact für AI |
| 10–11 s | **Recap** | Triptychon aller drei Kompetenzen | drei gestaffelte Pops |
| 11–13 s | **Tools** | „Our Tool Stack“: n8n · Otera · Claude, die n8n-Karte zieht sich auf | Pops/Klicks, Whoosh |
| 13–17,5 s | **Highlight n8n** | „Smart process automation.“ – Workflow Intake → Extraction → AI Analysis → Decision → Core System (+ Expert als Human-in-the-Loop) | Pentatonische Blips, Erfolgs-Chime, leises Ticken |
| 17,5–20,5 s | **Clients** | „Trusted by Leading Banks & Insurers“: LBBW, Commerzbank, Allianz, ERGO, Sparkassen-Finanzgruppe | Whoosh, Ticks, Riser zum Finale |
| 20,5–24 s | **Endcard** | „Your first point of contact for Data & AI.“ + DDFS | Capgemini Invent | Impact, Schlussakkord, Ausklang |

**Design:** Capgemini-Palette (Capgemini Blue `#0070AD`, Vibrant Blue `#12ABDB`, Deep Purple `#2B0A3D`, Akzent Zest Green `#95E616` für Erfolg) und die Hausschrift **Ubuntu** (+ Ubuntu Mono für die technischen HUD-Elemente).
**Sound:** komplett synthetisiert (Web Audio, keine Fremd-Samples, also auch keine Lizenzfragen): dezentes Musikbett in d-Moll (Dm–B♭–F–C) mit Kick, Hi-Hats und Bass, dazu Whooshes, Impacts, Riser, UI-Ticks und Blips genau auf den Animationen.

## Vorschau und neu rendern

Voraussetzungen: Node.js ≥ 18 und `ffmpeg` im `PATH`.

```bash
npm install                 # installiert Playwright (Chromium ggf. mit: npx playwright install chromium)
npm run preview             # Live-Vorschau mit Ton und Scrubber unter http://localhost:8080/ddfs-motion.html
npm run render              # finales MP4 → output/DDFS_Team-Intro_24s.mp4 (ca. 3 Min.)
npm run render:draft        # schneller Entwurf mit 30 fps
node motion/render.mjs --still 14.95 --out poster.png        # einzelnes Standbild
node motion/render.mjs --remux --out output/DDFS_Team-Intro_24s.mp4   # nur den Ton neu erzeugen
```

## Anpassen

* **Texte und Inhalte**: Objekt `CONTENT` am Anfang von `motion/ddfs-motion.html` (Team, Leads, Tools, Workflow-Schritte, Kunden).
* **Timing**: Objekt `T` (Szenenstarts, Design-Zeit) und `WARP` (Abbildung auf die reale Laufzeit, `DURATION`). Die Sound-Cues hängen an denselben Werten.
* **Echte Kundenlogos**: Die Kunden werden aktuell als einheitliche Wortmarken gesetzt. Liegt eine Logo-Datei unter dem Pfad aus `CONTENT.clients[].logo` (z. B. `motion/assets/logos/lbbw.png`, am besten dunkel/monochrom mit transparentem Hintergrund, weil die Szene hell ist), ersetzt sie die Wortmarke beim nächsten Rendern automatisch. Bitte vorher die Freigabe der Kunden für die Logo-Nutzung klären.
* **Tool-Icons** (n8n, Otera, Claude) sind bewusst abstrakte Symbole und keine Markenlogos.

Schriften: Ubuntu Font Family, Ubuntu Font Licence 1.0 (`motion/assets/fonts/UBUNTU-FONT-LICENCE.txt`).
