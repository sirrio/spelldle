import React from "react";
import { DailyDndle, compareList, compareNumber, compareText, type DndleConfig, type Result } from "@sirrio/dndle-core";
import { SPELLS, type Spell } from "./spells";

function levelLabel(level: number) {
  return level === 0 ? "Cantrip" : `Level ${level}`;
}

function rangeRank(value: string) {
  if (value === "Self") return 0;
  if (value === "Touch") return 1;
  const amount = Number.parseFloat(value);
  return value.toLowerCase().includes("mile") ? amount * 5280 + 1 : amount + 1;
}

function durationRank(value: string) {
  const normalized = value.toLowerCase();
  if (normalized === "instantaneous") return 0;
  if (normalized === "until dispelled") return Number.POSITIVE_INFINITY;
  const amount = Number.parseFloat(normalized);
  if (normalized.includes("round")) return amount * 6;
  if (normalized.includes("minute")) return amount * 60;
  if (normalized.includes("hour")) return amount * 3600;
  if (normalized.includes("day")) return amount * 86400;
  return 0;
}

function compareOrdered(value: string, target: string, rank: (entry: string) => number): Result {
  if (value === target) return "exact";
  const valueRank = rank(value);
  const targetRank = rank(target);
  if (valueRank === targetRank) return "partial";
  return valueRank < targetRank ? "higher" : "lower";
}

function displayDuration(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function SpellIcon({ spell }: { spell?: Spell }) {
  if (!spell) return <>?</>;
  const Icon = spell.icon;
  return <Icon aria-hidden="true" />;
}

export const SPELLDLE_CONFIG: DndleConfig<Spell> = {
  id: "spelldle",
  storageKey: "zauberdle",
  brand: "SPELLDLE",
  brandIconUrl: "brand.svg",
  tagline: "THE DAILY ARCANE ARCHIVE",
  entries: SPELLS,
  traits: [
    { key: "level", label: "Level", mobileLabel: "Spell level", value: (spell) => levelLabel(spell.level), compare: (guess, target) => compareNumber(guess.level, target.level) },
    { key: "school", label: "School", value: (spell) => spell.school, compare: (guess, target) => compareText(guess.school, target.school) },
    { key: "components", label: "Components", value: (spell) => spell.components.join(" · "), compare: (guess, target) => compareList(guess.components, target.components) },
    { key: "ritual", label: "Ritual", value: (spell) => spell.ritual ? "Yes" : "No", compare: (guess, target) => compareText(String(guess.ritual), String(target.ritual)) },
    { key: "casting", label: "Casting", mobileLabel: "Casting time", value: (spell) => spell.castingTime, compare: (guess, target) => compareText(guess.castingTime, target.castingTime) },
    { key: "range", label: "Range", value: (spell) => spell.range, compare: (guess, target) => compareOrdered(guess.range, target.range, rangeRank) },
    { key: "duration", label: "Duration", value: (spell) => displayDuration(spell.duration), compare: (guess, target) => compareOrdered(guess.duration, target.duration, durationRank) },
  ],
  daily: { startUtc: [2026, 0, 1], multiplier: 17, offset: 5 },
  itemLabel: "Spell",
  archiveName: "ARCANE ARCHIVE",
  resultsTitle: "The Signs",
  selectPrompt: "Select an entry from the Arcane Archive.",
  readyPrompt: "Ready to cast your guess.",
  actionLabel: "CAST",
  howTitle: "Find the spell",
  howIntro: "You have six guesses. Compare each result to uncover the spell hidden in the Arcane Archive.",
  howSteps: ["Choose a spell from the archive and cast your guess.", "Use the colors to compare all seven spell properties.", "Follow the arrows to narrow down ordered values."],
  arrowTraits: "level, range and duration",
  successKicker: (guesses) => `SOLVED IN ${guesses} GUESSES`,
  failureKicker: "THE ARCANE ARCHIVE CLOSES",
  nextLabel: "NEXT SPELL IN",
  shareQuestion: "Which spell is hidden in the Arcane Archive today?",
  shareUrl: "https://sirrio.github.io/spelldle/",
  resultSummary: (spell) => `${levelLabel(spell.level)} · ${spell.school} · ${spell.range} · ${displayDuration(spell.duration)}`,
  renderIcon: (spell) => <SpellIcon spell={spell} />,
  credits: <><p>This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at <a href="https://www.dndbeyond.com/srd" target="_blank" rel="noreferrer">dndbeyond.com/srd</a>. The SRD 5.2.1 is licensed under the <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution 4.0 International License</a>.</p><p>Spell icons by Lorc, Delapouite and the contributors of <a href="https://game-icons.net/" target="_blank" rel="noreferrer">Game-icons.net</a>, used under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a>.</p></>,
};

export default function App() {
  return <DailyDndle config={SPELLDLE_CONFIG} />;
}
