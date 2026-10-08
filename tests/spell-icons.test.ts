import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SPELLDLE_CONFIG } from "../src/App";
import { SPELLS } from "../src/spells";
import pixelIcons from "../src/spell-icons.generated.json";
import sources from "../public/spell-icons/sources.json";

test("all 72 spells render their own pixel artwork and retain an SVG load-error fallback", () => {
  assert.equal(Object.keys(pixelIcons).length, 72);
  assert.deepEqual(SPELLS.filter((spell) => !spell.iconPath), []);
  for (const spell of SPELLS) {
    const markup = renderToStaticMarkup(SPELLDLE_CONFIG.renderIcon(spell));
    assert.equal(typeof spell.icon, "function", `${spell.name} keeps a load-error fallback`);
    assert.ok(spell.iconPath, `${spell.name} has a pixel icon`);
    assert.match(markup, /<img /);
    assert.ok(markup.includes(`src="${spell.iconPath}"`));
    assert.match(markup, /alt="" aria-hidden="true"/);
    assert.doesNotMatch(markup, /<svg /);
    assert.equal(new URL(spell.iconPath, "https://example.com/spelldle/").pathname, `/spelldle/${spell.iconPath}`);
  }
  assert.equal(renderToStaticMarkup(SPELLDLE_CONFIG.renderIcon(undefined)), "?");
});

test("a spell without a pixel path still renders the original SVG", () => {
  const markup = renderToStaticMarkup(SPELLDLE_CONFIG.renderIcon({ ...SPELLS[0], iconPath: undefined }));
  assert.match(markup, /<svg /);
  assert.doesNotMatch(markup, /<img /);
});

test("every mapped icon is intact, with only Fog Cloud reusing Blur's source artwork", () => {
  const names = new Set(SPELLS.map((spell) => spell.name));
  assert.equal(sources.assets.length, 72);
  assert.equal(new Set(Object.values(pixelIcons)).size, 72);
  const spellsByArtwork = new Map<string, string[]>();
  for (const asset of sources.assets) {
    const names = spellsByArtwork.get(asset.sha256) ?? [];
    names.push(asset.spell);
    spellsByArtwork.set(asset.sha256, names);
  }
  const sharedArtwork = [...spellsByArtwork.values()].filter((names) => names.length > 1);
  assert.deepEqual(sharedArtwork.map((names) => names.sort()), [["Blur", "Fog Cloud"]]);
  for (const [name, path] of Object.entries(pixelIcons)) {
    assert.ok(names.has(name), `Unknown spell ${name}`);
    assert.match(path, /^spell-icons\/[a-z-]+\.png$/);
    const source = sources.assets.find((asset) => asset.spell === name);
    assert.ok(source, `Missing provenance for ${name}`);
    assert.equal(path, `spell-icons/${source.file}`);
    const bytes = readFileSync(new URL(`../public/${path}`, import.meta.url));
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], source.dimensions);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), source.sha256);
    if (!source.crop_xywh) assert.equal(source.sha256, source.source_sha256);
  }
});
