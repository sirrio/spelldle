// Mirrored in both games. Render dist/social-preview.html at 1200 x 630, DPR 1.
// The preview reuses the current theme tokens and original bundled artwork.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = dirname(fileURLToPath(import.meta.url));
const read = (file: string) => readFileSync(join(root, file), "utf8");
const game = JSON.parse(read("package.json")).name as string;
const spells = game === "spelldle";
const catalog = spells
  ? (await import("./src/spells")).SPELLS
  : (await import("./src/monsters")).MONSTERS;
const names = spells
  ? ["Fireball", "Mage Hand", "Shield", "Arcane Eye", "Healing Word", "Magic Missile", "Fly", "Find Familiar", "Light", "Misty Step", "Mirror Image", "Web"]
  : ["Aboleth", "Air Elemental", "Allosaurus", "Animated Armor", "Balor", "Basilisk", "Centaur Trooper", "Chimera", "Dire Wolf", "Ghost", "Hydra", "Mimic"];
function data(file: string, mime: string) {
  return `data:${mime};base64,${readFileSync(join(root, file)).toString("base64")}`;
}
const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const theme = read("src/index.css").match(/\.[a-z]+-theme\s*\{([\s\S]*?)\}/)?.[1];
if (!theme) throw new Error("Theme variables were not found.");
const variables = theme.replace(/url\("\/([^"]+)"\)/g, (_, path: string) => `url("${data("public/" + path, "image/png")}")`);
const slots = names.map(name => {
  const entry = catalog.find(item => item.name === name);
  if (!entry) throw new Error(`Missing catalog entry: ${name}`);
  const iconPath = "iconPath" in entry ? entry.iconPath : undefined;
  const icon = typeof iconPath === "string"
    ? `<img class="pixel-icon" src="${data("public/" + iconPath, "image/png")}" alt="">`
    : renderToStaticMarkup(createElement(entry.icon, { "aria-hidden": true }));
  return `<div class="slot"><span class="icon">${icon}</span><strong>${escape(name)}</strong></div>`;
}).join("\n");
const displayFont = data("node_modules/@fontsource/bree-serif/files/bree-serif-latin-400-normal.woff2", "font/woff2");
const uiFont = data("node_modules/@fontsource/roboto-condensed/files/roboto-condensed-latin-400-normal.woff2", "font/woff2");
const boldFont = data("node_modules/@fontsource/roboto-condensed/files/roboto-condensed-latin-700-normal.woff2", "font/woff2");
const title = spells ? "Arcane Archive" : "Monster Hunt";
const archive = spells ? "Spell Archive" : "Bestiary";
const noun = spells ? "spells" : "monsters";
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(game)} social preview</title><style>
@font-face{font-family:Bree;src:url("${displayFont}") format("woff2");font-weight:400}
@font-face{font-family:Roboto;src:url("${uiFont}") format("woff2");font-weight:400}
@font-face{font-family:Roboto;src:url("${boldFont}") format("woff2");font-weight:700}
*{box-sizing:border-box}
:root{${variables}}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#e8dfcf;color:var(--ink);font-family:Roboto,sans-serif}
.header{height:102px;padding:22px 48px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:16px;color:var(--red-dark);font:400 46px/1 Bree,serif;letter-spacing:.045em}
.brand img{width:42px;height:58px}
.tagline{color:var(--ink-soft);font-size:20px;font-weight:700;letter-spacing:.12em}
.book{display:grid;grid-template-columns:1fr 1fr;width:1144px;height:500px;margin:0 28px;border:24px solid transparent;border-image:var(--book-cover) var(--cover-slice) fill / var(--cover-width) / 0 stretch;image-rendering:pixelated;filter:drop-shadow(0 8px 8px #30354b20)}
.page{border:0;border-image:var(--book-left) var(--page-left-slice) fill / var(--page-left-width) / 0 stretch;padding:34px 40px;min-width:0}
.archive{border-image:var(--book-right) var(--page-right-slice) fill / var(--page-right-width) / 0 stretch;padding:26px 30px}
.story{display:flex;flex-direction:column;align-items:flex-start;justify-content:center}
h1{font:400 52px/1.06 Bree,serif;margin:0 0 22px;letter-spacing:-.02em}
.description{font-size:26px;line-height:1.4;color:var(--ink-soft);margin:0}
.feedback{display:flex;gap:6px;margin:28px 0 16px}
.feedback i{display:block;width:34px;height:34px;border-radius:2px;background:var(--gray)}
.feedback .exact{background:var(--green)}.feedback .partial{background:var(--yellow)}
.caption{font-size:18px;color:var(--ink-soft);margin:0}
h2{font:400 28px/1.2 Bree,serif;margin:0 0 14px;padding-bottom:12px;border-bottom:1px solid var(--line)}
.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.slot{height:100px;border:8px solid transparent;border-image:var(--book-slot) var(--slot-slice) fill / var(--slot-width) / 0 stretch;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#ffe7c6;text-align:center}
.icon{height:48px;width:48px;display:grid;place-items:center}
.icon svg,.icon img{display:block;width:48px;height:48px;object-fit:contain}
.pixel-icon{image-rendering:pixelated}
.slot strong{font-size:14px;line-height:15px;font-weight:700}
</style></head><body>
<header class="header"><div class="brand"><img src="${data("public/brand-mark.svg","image/svg+xml")}" alt="">${escape(game.toUpperCase())}</div><span class="tagline">A DAILY D&amp;D PUZZLE</span></header>
<main class="book"><section class="page story"><h1>The Daily<br>${title}</h1><p class="description">72 ${noun}. Seven guesses.<br>A new puzzle every day.</p>
<div class="feedback" aria-label="Example comparison feedback"><i class="exact"></i><i class="partial"></i><i></i><i class="exact"></i><i></i><i class="partial"></i><i class="exact"></i></div>
<p class="caption">Follow the clues. Find today’s ${spells ? "spell" : "monster"}.</p></section><section class="page archive"><h2>${archive}</h2><div class="grid">${slots}</div></section></main>
</body></html>`;
mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist/social-preview.html"), html);
console.log(`Created ${game}/dist/social-preview.html (1200 x 630).`);

