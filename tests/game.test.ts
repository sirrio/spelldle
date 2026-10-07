import assert from "node:assert/strict";
import test from "node:test";
import { SPELLDLE_CONFIG } from "../src/App";
import { verifyGame } from "./verify-game";

verifyGame("Spelldle", SPELLDLE_CONFIG);

test("Flaming Sphere uses Evocation for school display and feedback", () => {
  const flamingSphere = SPELLDLE_CONFIG.entries.find((spell) => spell.name === "Flaming Sphere");
  const evocation = SPELLDLE_CONFIG.entries.find((spell) => spell.name === "Burning Hands");
  const conjuration = SPELLDLE_CONFIG.entries.find((spell) => spell.name === "Web");
  const school = SPELLDLE_CONFIG.traits.find((trait) => trait.key === "school");
  assert.ok(flamingSphere && evocation && conjuration && school);
  assert.equal(school.value(flamingSphere), "Evocation");
  assert.equal(school.compare(flamingSphere, evocation), "exact");
  assert.notEqual(school.compare(flamingSphere, conjuration), "exact");
});
