# DDFS · Team-Intro (28 s Motion Graphics)

28-Sekunden-Video als Team-Intro und Pitch für Kunden: **Data-Driven Financial Services (DDFS), Capgemini Invent**.

| Datei | Inhalt |
| --- | --- |
| `output/DDFS_Team-Intro_28s.mp4` | Finales Video – 1920×1080, 60 fps, H.264 + AAC-Stereo (-14 LUFS) |
| `output/DDFS_Team-Intro_28s_LinkedIn_4x5.mp4` | Hochformat für LinkedIn – 1080×1350 (4:5), sonst identisch |
| `output/DDFS_Team-Intro_poster_LinkedIn_4x5.jpg` | Endcard im Hochformat |
| `output/DDFS_Team-Intro_poster.jpg` | Standbild der Endcard (Thumbnail/Vorschaubild) |
| `motion/ddfs-motion.html` | Quelle: Animation (Canvas) + Sounddesign (Web Audio), mit Live-Vorschau |
| `motion/render.mjs` | Export Frame für Frame → MP4 (Playwright + ffmpeg) |

## Storyboard

Alle Schnitte liegen auf einem 120-BPM-Raster (ein Beat = 0,5 s). Die Szenen sind auf einer 13-s-Design-Timeline animiert und werden über `SEGMENTS` auf 28 s Laufzeit gedehnt: Ein- und Ausstiegsanimationen laufen fast in Originaltempo, die Standzeiten dazwischen werden länger. So bleibt es ruhig, ohne träge zu wirken. Bild und Ton nutzen dieselben Cue-Zeiten.

| Zeit | Szene | Bild | Ton |
| --- | --- | --- | --- |
| 0–4 s | **Intro** | Scan-Linie öffnet sich, Datenpunkte laufen als Welle durchs Bild, „DDFS“ entschlüsselt sich Buchstabe für Buchstabe | Riser, Glitches, Ticks, Impact bei 2 s, ab hier läuft der Beat |
| 4–7,5 s | **Team** | 26 Knoten bauen ein Netzwerk auf („26 Experts. One Team.“), Leads Marcel Walther & André Kühn | Zoom-Whoosh, ein Tick pro Knoten, zwei Blips für die Leads |
| 7,5–13,5 s | **Expertise** | „Data“ → „Insurance & Banking“ → „AI“, jede Kompetenz mit eigener Farbwelt und eigenem Übergang | Whooshes, Pops, Glitch + kurzer Impact für AI |
| 13,5–15 s | **Recap** | Triptychon aller drei Kompetenzen | drei gestaffelte Pops |
| 15–17,5 s | **Tools** | „Our Tool Stack“: n8n · Otera · Claude, die n8n-Karte zieht sich auf | Pops/Klicks, Whoosh |
| 17,5–23,5 s | **Highlight n8n** | „Smart process automation.“ – Workflow Intake → Extraction → AI Analysis → Decision → Core System (+ Expert als Human-in-the-Loop), staucht sich am Ende zur Linie der Endcard | Pentatonische Blips, Erfolgs-Chime, leises Ticken, Riser zum Finale |
| 23,5–28 s | **Endcard** | „Your first point of contact for Data & AI.“ + DDFS | Capgemini Invent | Impact, Schlussakkord, Ausklang |

**Design:** Capgemini-Palette (Capgemini Blue `#0070AD`, Vibrant Blue `#12ABDB`, Deep Purple `#2B0A3D`, Akzent Zest Green `#95E616` für Erfolg) und die Hausschrift **Ubuntu** (+ Ubuntu Mono für die technischen HUD-Elemente).
**Sound:** komplett synthetisiert (Web Audio, keine Fremd-Samples, also auch keine Lizenzfragen): dezentes Musikbett in d-Moll (Dm–B♭–F–C) mit Kick, Hi-Hats und Bass, dazu Whooshes, Impacts, Riser, UI-Ticks und Blips genau auf den Animationen.

## Vorschau und neu rendern

Voraussetzungen: Node.js ≥ 18 und `ffmpeg` im `PATH`.

```bash
npm install                 # installiert Playwright (Chromium ggf. mit: npx playwright install chromium)
npm run preview             # Live-Vorschau mit Ton und Scrubber unter http://localhost:8080/ddfs-motion.html
npm run render              # finales MP4 (Querformat) → output/DDFS_Team-Intro_28s.mp4 (ca. 3 Min.)
npm run render:vertical     # Hochformat 4:5 für LinkedIn → output/DDFS_Team-Intro_28s_LinkedIn_4x5.mp4
npm run render:draft        # schneller Entwurf mit 30 fps
node motion/render.mjs --still 27.95 --out poster.png        # einzelnes Standbild
node motion/render.mjs --remux --out output/DDFS_Team-Intro_28s.mp4   # nur den Ton neu erzeugen
```

## Anpassen

* **Formate**: Quer- und Hochformat kommen aus derselben Datei. Die Vorschau zeigt das Hochformat mit `ddfs-motion.html?format=vertical`, die Positionen je Format stehen in `LY` und direkt in den Szenen (`V ? … : …`).
* **Texte und Inhalte**: Objekt `CONTENT` am Anfang von `motion/ddfs-motion.html` (Team, Leads, Tools, Workflow-Schritte).
* **Timing**: Objekt `T` (Szenenstarts, Design-Zeit) und `SEGMENTS` (reale Dauer je Szene, daraus `WARP` und `DURATION`). Die Sound-Cues hängen an denselben Werten.
* **Tool-Icons** (n8n, Otera, Claude) sind bewusst abstrakte Symbole und keine Markenlogos.

Schriften: Ubuntu Font Family, Ubuntu Font Licence 1.0 (`motion/assets/fonts/UBUNTU-FONT-LICENCE.txt`).

---

# AVB-Agent · Erklärvideo (47 s Motion Graphics)

Produktvideo für den **AVB-Agent**: Er passt Allgemeine Versicherungsbedingungen (AVB) der PKV an die neue GOÄ an. Das Video enthält **bewusst kein Kunden-Branding**, also keine Logos, Farben oder Namen einer echten Versicherung, und nutzt eine eigene, neutrale Farbwelt.

| Datei | Inhalt |
| --- | --- |
| `output/AVB-Agent_Erklaervideo_47s.mp4` | Finales Video, 1920×1080, 60 fps, H.264 + AAC (-14 LUFS) |
| `motion/avb-motion.html` | Quelle: Animation (Canvas) und Sounddesign (Web Audio), mit Live-Vorschau |
| `motion/AVB-Agent_Prompt.md` | Storyline-Prompt, aus dem das Video gebaut wurde |

| Zeit | Szene | Inhalt |
| --- | --- | --- |
| 0–5 s | Ausgangslage | GOÄ, Zeitstrahl 1982 → 1996 → **GOÄ neu**: Die Abrechnungsgrundlage der PKV wird grundlegend neu gefasst |
| 5–10,5 s | Was sich ändert | ≈ 5.500 Gebührenpositionen · Festbeträge statt Steigerungsfaktor · neuer Paragrafenteil (Fußzeile: Entwurfsstand, geplant 2028) |
| 10,5–16 s | Die Folge | AVB-Dokument mit veralteten GOÄ-Verweisen: Jede PKV muss ihre AVB anpassen |
| 16–21 s | Das Problem | Dutzende Dokumente, tickende Uhr: heute Klausel für Klausel von Hand |
| 21–23,5 s | Die Wende | AVB-Agent: zwei KI-Agenten, eine aktuelle AVB |
| 23,5–40 s | Produkt | 1 Einlesen · 2 Agent 1 identifiziert betroffene Textblöcke · 3 Agent 2 formuliert neu · 4 Alt/Neu prüfen, GOÄ-Quelle, bearbeiten, freigeben · 5 Ausgabe in Format, Schrift und Größe der Wahl |
| 40–43,5 s | Mehrwert | Weniger manueller Aufwand · volle Transparenz · volle Kontrolle |
| 43,5–47 s | Endcard | „AVB-Agent – GOÄ neu. AVB aktuell.“ |

```bash
npm run preview:avb   # Live-Vorschau unter http://localhost:8080/avb-motion.html
npm run render:avb    # finales MP4 → output/AVB-Agent_Erklaervideo_47s.mp4
```

Texte, Produktname, Beispielklauseln und Quellenangabe stehen im Objekt `CONTENT`, die Szenenzeiten im Objekt `S` am Anfang von `motion/avb-motion.html`. Die Beispielklauseln sind generische Illustrationen und zitieren kein echtes Bedingungswerk.
