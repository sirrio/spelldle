import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { SPELLDLE_CONFIG } from "../src/App";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const origin = "https://spelldle.com/";

test("shared results and discovery metadata use the canonical domain", () => {
  assert.equal(SPELLDLE_CONFIG.shareUrl, `${origin}?share=1`);
  assert.equal(SPELLDLE_CONFIG.relatedGame?.url, "https://critterdle.com/");
  assert.match(html, /<link rel="canonical" href="https:\/\/spelldle\.com\/"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/spelldle\.com\/"/);
  const images = [...html.matchAll(/<meta (?:property="og:image"|name="twitter:image") content="([^"]+)"/g)];
  assert.equal(images.length, 2);
  for (const [, value] of images) {
    const url = new URL(value);
    assert.equal(`${url.origin}/`, origin);
    assert.equal(url.pathname, "/og.png");
    assert.ok(existsSync(new URL(`../public${url.pathname}`, import.meta.url)));
  }
});

test("favicon and brand mark remain portable between domain and repository roots", () => {
  const favicon = html.match(/<link rel="icon"[^>]*href="([^"]+)"/)?.[1];
  assert.ok(favicon);
  const paths = [favicon.replace("%BASE_URL%", "./"), SPELLDLE_CONFIG.brandIconUrl];
  for (const path of paths) {
    assert.ok(path);
    for (const base of [origin, "https://sirrio.github.io/spelldle/"]) {
      const resolved = new URL(path, base);
      assert.equal(resolved.origin, new URL(base).origin);
      assert.ok(resolved.pathname.startsWith(new URL(base).pathname));
      const file = resolved.pathname.slice(new URL(base).pathname.length);
      assert.ok(existsSync(new URL(`../public/${file}`, import.meta.url)));
    }
  }
});
