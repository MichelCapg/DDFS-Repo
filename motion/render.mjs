// Exportiert ddfs-motion.html Frame für Frame als MP4 (H.264 + AAC).
// Nutzung: node motion/render.mjs [--fps 60] [--crf 18] [--out output/DDFS_Team-Intro_24s.mp4]
//          [--still 14.9 --out output/poster.png]
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, rm, rename } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, arr) => {
  if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]);
  return acc;
}, []));
const FPS = +(args.fps || 60);
const CRF = String(args.crf || 18);
const OUT = resolve(args.out || join(ROOT, "..", "output", "DDFS_Team-Intro_24s.mp4"));
const TMP = resolve(ROOT, "..", ".render-tmp");

const MIME = { ".html": "text/html", ".woff2": "font/woff2", ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".webp": "image/webp" };
const server = createServer(async (req, res) => {
  const p = join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  try { const body = await readFile(p); res.writeHead(200, { "content-type": MIME[extname(p)] || "application/octet-stream" }).end(body); }
  catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/ddfs-motion.html?render=1`;

const run = (cmd, argv, opts = {}) => new Promise((res, rej) => {
  const p = spawn(cmd, argv, { stdio: ["pipe", "pipe", "pipe"], ...opts });
  let err = "";
  p.stderr.on("data", d => { err += d; });
  p.on("close", code => code === 0 ? res(err) : rej(new Error(`${cmd} exited ${code}\n${err.slice(-2000)}`)));
  if (opts.input) { p.stdin.end(opts.input); }
  run.last = p;
});

const browser = await chromium.launch({ args: ["--disable-gpu-vsync", "--force-color-profile=srgb"] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on("console", m => { if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) console.error("[page]", m.text()); });
page.on("pageerror", e => console.error("[pageerror]", e));
await page.goto(url);
await page.evaluate(() => window.__ready);
const DURATION = await page.evaluate(() => DURATION); // reale Laufzeit aus der Szene
await mkdir(dirname(OUT), { recursive: true });

// Canvas direkt auslesen (deutlich schneller als page.screenshot)
const grab = async t => {
  const url = await page.evaluate(t => { window.__draw(t); return document.getElementById("stage").toDataURL("image/png"); }, t);
  return Buffer.from(url.slice(url.indexOf(",") + 1), "base64");
};

if (args.still) {
  await writeFile(OUT, await grab(+args.still));
  console.log("Still:", OUT);
} else if (args.stills) { // z. B. --stills 1,4.2,9.5 --out qa/ -> einzelne PNGs zur Kontrolle
  await mkdir(OUT, { recursive: true });
  for (const s of String(args.stills).split(",")) await writeFile(join(OUT, `t${(+s).toFixed(2)}.png`), await grab(+s));
  console.log("Stills:", OUT);
} else {
  await rm(TMP, { recursive: true, force: true }); await mkdir(TMP, { recursive: true });
  const videoTmp = join(TMP, "video.mp4"), wav = join(TMP, "audio.wav");

  // --- Video (mit --remux wird nur der Ton neu erzeugt und das Bild aus --out übernommen)
  const total = Math.round(DURATION * FPS);
  if (args.remux) {
    await run("ffmpeg", ["-y", "-loglevel", "error", "-i", OUT, "-map", "0:v", "-c", "copy", videoTmp]);
  } else {
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", CRF, "-tune", "animation", "-pix_fmt", "yuv420p", "-profile:v", "high",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-movflags", "+faststart", videoTmp], { stdio: ["pipe", "inherit", "inherit"] });
  const ffDone = new Promise((res, rej) => ff.on("close", c => c === 0 ? res() : rej(new Error("ffmpeg video failed"))));
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    const png = await grab(f / FPS);
    if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once("drain", r));
    if (f % FPS === 0) process.stdout.write(`\rFrame ${f}/${total}  (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end(); await ffDone;
  console.log(`\rVideo: ${total} Frames in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }

  // --- Audio (OfflineAudioContext im Browser -> 32-bit-float WAV)
  const b64 = await page.evaluate(() => window.__audio());
  const pcm = Buffer.from(b64, "base64");
  const hdr = Buffer.alloc(44), sr = 48000, ch = 2;
  hdr.write("RIFF", 0); hdr.writeUInt32LE(36 + pcm.length, 4); hdr.write("WAVE", 8); hdr.write("fmt ", 12);
  hdr.writeUInt32LE(16, 16); hdr.writeUInt16LE(3, 20); hdr.writeUInt16LE(ch, 22); hdr.writeUInt32LE(sr, 24);
  hdr.writeUInt32LE(sr * ch * 4, 28); hdr.writeUInt16LE(ch * 4, 32); hdr.writeUInt16LE(32, 34); hdr.write("data", 36); hdr.writeUInt32LE(pcm.length, 40);
  await writeFile(wav, Buffer.concat([hdr, pcm]));

  // --- Lautheit messen (EBU R128), statische Verstärkung auf -14 LUFS + Peak-Limiter bei -1,5 dBFS
  //     (statt dynamischem loudnorm, damit die Dynamik der Impacts erhalten bleibt)
  const target = { I: -14, TP: -1.5 };
  const log = await run("ffmpeg", ["-hide_banner", "-i", wav, "-af", "loudnorm=print_format=json", "-f", "null", "-"]);
  const m = JSON.parse(log.slice(log.lastIndexOf("{"), log.lastIndexOf("}") + 1));
  const gain = (target.I - parseFloat(m.input_i)).toFixed(2);
  const limit = Math.pow(10, target.TP / 20).toFixed(3);
  await run("ffmpeg", ["-y", "-loglevel", "error", "-i", videoTmp, "-i", wav, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
    "-af", `volume=${gain}dB,aresample=192000,alimiter=limit=${limit}:attack=2:release=60:level=false,aresample=48000`,
    "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-t", String(DURATION), "-movflags", "+faststart", OUT + ".tmp.mp4"]);
  await rename(OUT + ".tmp.mp4", OUT);
  if (args.wav) await writeFile(resolve(args.wav), Buffer.concat([hdr, pcm]));
  console.log(`Audio: ${m.input_i} LUFS gemessen, ${gain} dB Gain -> ${target.I} LUFS`);
  console.log("Fertig:", OUT);
  await rm(TMP, { recursive: true, force: true });
}

await browser.close();
server.close();
