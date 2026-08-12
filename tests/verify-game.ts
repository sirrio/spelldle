import assert from "node:assert/strict";
import test from "node:test";
import { dailyTarget, type DndleConfig, type DndleEntry } from "@sirrio/dndle-core";

export function verifyGame<T extends DndleEntry>(label: string, config: DndleConfig<T>) {
  test(`${label} has a complete, distinguishable 8×9 archive`, () => {
    assert.equal(config.entries.length, 72);
    assert.equal(new Set(config.entries.map((entry) => entry.name)).size, 72);
    assert.equal(config.traits.length, 7);
    for (const entry of config.entries) {
      assert.ok(entry.name);
      for (const trait of config.traits) assert.notEqual(trait.value(entry), "");
      assert.ok(config.renderIcon(entry));
    }
    const signatures = config.entries.map((entry) => config.traits.map((trait) => trait.value(entry)).join("|"));
    assert.equal(new Set(signatures).size, 72, "Every target needs a unique seven-property signature.");
  });

  test(`${label} daily rotation reaches all 72 entries`, () => {
    const names = new Set<string>();
    for (let day = 0; day < 72; day += 1) {
      names.add(dailyTarget(config.entries, config.daily, new Date(Date.UTC(2026, 0, 1 + day))).name);
    }
    assert.equal(names.size, 72);
  });

  test(`${label} has a deterministic feedback path of at most six guesses for every target`, () => {
    const byName = new Map(config.entries.map((entry, index) => [entry.name, index]));
    const patterns = config.entries.map((guess) => config.entries.map((target) =>
      config.traits.map((trait) => trait.compare(guess, target)).join(",")
    ));
    const bestGuessCache = new Map<string, number>();

    function choose(candidates: number[]) {
      const key = candidates.join(",");
      const cached = bestGuessCache.get(key);
      if (cached !== undefined) return cached;
      let best = candidates[0];
      let bestWorst = Number.POSITIVE_INFINITY;
      let bestDistinct = -1;
      for (const guess of candidates) {
        const buckets = new Map<string, number>();
        for (const target of candidates) {
          const pattern = patterns[guess][target];
          buckets.set(pattern, (buckets.get(pattern) || 0) + 1);
        }
        const worst = Math.max(...buckets.values());
        if (worst < bestWorst || (worst === bestWorst && buckets.size > bestDistinct)) {
          best = guess;
          bestWorst = worst;
          bestDistinct = buckets.size;
        }
      }
      bestGuessCache.set(key, best);
      return best;
    }

    let maximum = 0;
    for (const targetEntry of config.entries) {
      const target = byName.get(targetEntry.name)!;
      let candidates = config.entries.map((_, index) => index);
      let solved = false;
      for (let turn = 1; turn <= 6; turn += 1) {
        const guess = choose(candidates);
        if (guess === target) {
          maximum = Math.max(maximum, turn);
          solved = true;
          break;
        }
        const result = patterns[guess][target];
        candidates = candidates.filter((candidate) => patterns[guess][candidate] === result);
      }
      assert.ok(solved, `${targetEntry.name} could not be isolated in six guesses.`);
    }
    assert.ok(maximum <= 6);
  });
}

