import { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  GiAcidBlob, GiAngelWings, GiCat, GiCharm,
  GiAnvilImpact, GiBlindfold, GiBodySwapping, GiBrokenShield, GiBroadsword,
  GiCometSpark, GiCrystalBall, GiCrystalEye, GiDominoMask,
  GiEclipse, GiEyeball,
  GiFairyWand, GiFeather, GiFeatheredWing, GiFireball, GiFirePunch,
  GiFlameSpin, GiFog, GiFootprint,
  GiHalfDead, GiHandOfGod, GiHealing,
  GiHealingShield, GiHeartPlus, GiHeartShield, GiHeartWings, GiImprisoned, GiInvisible,
  GiLeatherBoot, GiLanternFlame, GiMagicPalm, GiMagicShield,
  GiMagicSwirl, GiMagickTrick, GiMagnifyingGlass,
  GiMuscleUp, GiNightSleep, GiNightVision, GiOilySpiral,
  GiPointing, GiPoisonBottle,
  GiOpenPalm, GiPathDistance, GiPrayer, GiRaiseSkeleton, GiRingedBeam,
  GiPadlock, GiScrollQuill, GiShadowFollower, GiShieldBounces, GiShiningHeart, GiSkeletonKey,
  GiShieldReflect, GiSparkles, GiSun, GiTeleport, GiTombstone,
  GiBread, GiLips, GiThreeFriends, GiTowerFall, GiVineLeaf, GiWarlockEye, GiWingfoot, GiGiant, GiFireRay, GiRingingBell, GiSpiderWeb,
} from "react-icons/gi";

type Spell = {
  name: string;
  level: number;
  school: string;
  components: string[];
  ritual: boolean;
  castingTime: string;
  icon: IconType;
};

type Result = "exact" | "partial" | "wrong" | "higher" | "lower";
type GameStats = { played: number; wins: number; totalGuesses: number; streak: number; lastWin: string; distribution: number[] };

const SPELLS: Spell[] = [
  { name: "Acid Splash", level: 0, school: "Conjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiAcidBlob },
  { name: "Alarm", level: 1, school: "Abjuration", components: ["V", "S", "M"], ritual: true, castingTime: "1 Minute", icon: GiRingingBell },
  { name: "Aid", level: 2, school: "Abjuration", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiHeartShield },
  { name: "Sleep", level: 1, school: "Enchantment", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiNightSleep },
  { name: "Bless", level: 1, school: "Enchantment", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiAngelWings },
  { name: "Burning Hands", level: 1, school: "Evocation", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiFirePunch },
  { name: "Charm Person", level: 1, school: "Enchantment", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiCharm },
  { name: "Comprehend Languages", level: 1, school: "Divination", components: ["V", "S", "M"], ritual: true, castingTime: "1 Action", icon: GiScrollQuill },
  { name: "Cure Wounds", level: 1, school: "Evocation", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiHealing },
  { name: "Detect Magic", level: 1, school: "Divination", components: ["V", "S"], ritual: true, castingTime: "1 Action", icon: GiMagicSwirl },
  { name: "Disguise Self", level: 1, school: "Illusion", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiDominoMask },
  { name: "Feather Fall", level: 1, school: "Transmutation", components: ["V", "M"], ritual: false, castingTime: "1 Reaction", icon: GiFeather },
  { name: "Find Familiar", level: 1, school: "Conjuration", components: ["V", "S", "M"], ritual: true, castingTime: "1 Hour", icon: GiCat },
  { name: "Fireball", level: 3, school: "Evocation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiFireball },
  { name: "Fly", level: 3, school: "Transmutation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiFeatheredWing },
  { name: "Fog Cloud", level: 1, school: "Conjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiFog },
  { name: "Guidance", level: 0, school: "Divination", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiHandOfGod },
  { name: "Healing Word", level: 1, school: "Evocation", components: ["V"], ritual: false, castingTime: "1 Bonus Action", icon: GiHeartWings },
  { name: "Identify", level: 1, school: "Divination", components: ["V", "S", "M"], ritual: true, castingTime: "1 Minute", icon: GiMagnifyingGlass },
  { name: "Invisibility", level: 2, school: "Illusion", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiInvisible },
  { name: "Knock", level: 2, school: "Transmutation", components: ["V"], ritual: false, castingTime: "1 Action", icon: GiSkeletonKey },
  { name: "Light", level: 0, school: "Evocation", components: ["V", "M"], ritual: false, castingTime: "1 Action", icon: GiSparkles },
  { name: "Mage Armor", level: 1, school: "Abjuration", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiMagicShield },
  { name: "Mage Hand", level: 0, school: "Conjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiMagicPalm },
  { name: "Magic Missile", level: 1, school: "Evocation", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiCometSpark },
  { name: "Mending", level: 0, school: "Transmutation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Minute", icon: GiAnvilImpact },
  { name: "Misty Step", level: 2, school: "Conjuration", components: ["V"], ritual: false, castingTime: "1 Bonus Action", icon: GiTeleport },
  { name: "Prestidigitation", level: 0, school: "Transmutation", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiMagickTrick },
  { name: "Revivify", level: 3, school: "Necromancy", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiHeartPlus },
  { name: "Shield", level: 1, school: "Abjuration", components: ["V", "S"], ritual: false, castingTime: "1 Reaction", icon: GiShieldReflect },
  { name: "Animate Dead", level: 3, school: "Necromancy", components: ["V", "S", "M"], ritual: false, castingTime: "1 Minute", icon: GiRaiseSkeleton },
  { name: "Arcane Eye", level: 4, school: "Divination", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiCrystalEye },
  { name: "Arcane Lock", level: 2, school: "Abjuration", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiPadlock },
  { name: "Augury", level: 2, school: "Divination", components: ["V", "S", "M"], ritual: true, castingTime: "1 Minute", icon: GiCrystalBall },
  { name: "Web", level: 2, school: "Conjuration", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiSpiderWeb },
  { name: "Beacon of Hope", level: 3, school: "Abjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiShiningHeart },
  { name: "Blindness/Deafness", level: 2, school: "Necromancy", components: ["V"], ritual: false, castingTime: "1 Action", icon: GiBlindfold },
  { name: "Blur", level: 2, school: "Illusion", components: ["V"], ritual: false, castingTime: "1 Action", icon: GiShadowFollower },
  { name: "Clairvoyance", level: 3, school: "Divination", components: ["V", "S", "M"], ritual: false, castingTime: "10 Minutes", icon: GiWarlockEye },
  { name: "Command", level: 1, school: "Enchantment", components: ["V"], ritual: false, castingTime: "1 Action", icon: GiPointing },
  { name: "Continual Flame", level: 2, school: "Evocation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiLanternFlame },
  { name: "Counterspell", level: 3, school: "Abjuration", components: ["S"], ritual: false, castingTime: "1 Reaction", icon: GiShieldBounces },
  { name: "Create Food and Water", level: 3, school: "Conjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiBread },
  { name: "Darkness", level: 2, school: "Evocation", components: ["V", "M"], ritual: false, castingTime: "1 Action", icon: GiEclipse },
  { name: "Darkvision", level: 2, school: "Transmutation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiNightVision },
  { name: "Daylight", level: 3, school: "Evocation", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiSun },
  { name: "Dispel Magic", level: 3, school: "Abjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiBrokenShield },
  { name: "Enhance Ability", level: 2, school: "Transmutation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiMuscleUp },
  { name: "Enlarge/Reduce", level: 2, school: "Transmutation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiGiant },
  { name: "Entangle", level: 1, school: "Conjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiVineLeaf },
  { name: "Expeditious Retreat", level: 1, school: "Transmutation", components: ["V", "S"], ritual: false, castingTime: "1 Bonus Action", icon: GiLeatherBoot },
  { name: "Faerie Fire", level: 1, school: "Evocation", components: ["V"], ritual: false, castingTime: "1 Action", icon: GiFairyWand },
  { name: "False Life", level: 1, school: "Necromancy", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiHalfDead },
  { name: "Flaming Sphere", level: 2, school: "Conjuration", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiFlameSpin },
  { name: "Gentle Repose", level: 2, school: "Necromancy", components: ["V", "S", "M"], ritual: true, castingTime: "1 Action", icon: GiTombstone },
  { name: "Grease", level: 1, school: "Conjuration", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiOilySpiral },
  { name: "Hold Person", level: 2, school: "Enchantment", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiImprisoned },
  { name: "Jump", level: 1, school: "Transmutation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiWingfoot },
  { name: "Lesser Restoration", level: 2, school: "Abjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiHealingShield },
  { name: "Levitate", level: 2, school: "Transmutation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiOpenPalm },
  { name: "Locate Object", level: 2, school: "Divination", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiPathDistance },
  { name: "Magic Mouth", level: 2, school: "Illusion", components: ["V", "S", "M"], ritual: true, castingTime: "1 Minute", icon: GiLips },
  { name: "Magic Weapon", level: 2, school: "Transmutation", components: ["V", "S"], ritual: false, castingTime: "1 Bonus Action", icon: GiBroadsword },
  { name: "Mirror Image", level: 2, school: "Illusion", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiThreeFriends },
  { name: "Pass without Trace", level: 2, school: "Abjuration", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiFootprint },
  { name: "Prayer of Healing", level: 2, school: "Evocation", components: ["V"], ritual: false, castingTime: "10 Minutes", icon: GiPrayer },
  { name: "Protection from Poison", level: 2, school: "Abjuration", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiPoisonBottle },
  { name: "Ray of Enfeeblement", level: 2, school: "Necromancy", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiRingedBeam },
  { name: "Alter Self", level: 2, school: "Transmutation", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiBodySwapping },
  { name: "Scorching Ray", level: 2, school: "Evocation", components: ["V", "S"], ritual: false, castingTime: "1 Action", icon: GiFireRay },
  { name: "See Invisibility", level: 2, school: "Divination", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiEyeball },
  { name: "Shatter", level: 2, school: "Evocation", components: ["V", "S", "M"], ritual: false, castingTime: "1 Action", icon: GiTowerFall },
];

const SORTED_SPELLS = [...SPELLS].sort((a, b) => a.name.localeCompare(b.name));

const SPELL_DETAILS: Record<string, [range: string, duration: string]> = {
  "Acid Splash": ["60 feet", "Instantaneous"], "Alarm": ["30 feet", "8 hours"], "Aid": ["30 feet", "8 hours"],
  "Sleep": ["90 feet", "1 minute"], "Bless": ["30 feet", "Up to 1 minute"], "Burning Hands": ["Self", "Instantaneous"],
  "Charm Person": ["30 feet", "1 hour"], "Comprehend Languages": ["Self", "1 hour"], "Cure Wounds": ["Touch", "Instantaneous"],
  "Detect Magic": ["Self", "Up to 10 minutes"], "Disguise Self": ["Self", "1 hour"], "Feather Fall": ["60 feet", "1 minute"],
  "Find Familiar": ["10 feet", "Instantaneous"], "Fireball": ["150 feet", "Instantaneous"], "Fly": ["Touch", "Up to 10 minutes"],
  "Fog Cloud": ["120 feet", "Up to 1 hour"], "Guidance": ["Touch", "Up to 1 minute"], "Healing Word": ["60 feet", "Instantaneous"],
  "Identify": ["Touch", "Instantaneous"], "Invisibility": ["Touch", "Up to 1 hour"], "Knock": ["60 feet", "Instantaneous"],
  "Light": ["Touch", "1 hour"], "Mage Armor": ["Touch", "8 hours"], "Mage Hand": ["30 feet", "1 minute"],
  "Magic Missile": ["120 feet", "Instantaneous"], "Mending": ["Touch", "Instantaneous"], "Misty Step": ["Self", "Instantaneous"],
  "Prestidigitation": ["10 feet", "1 hour"], "Revivify": ["Touch", "Instantaneous"], "Shield": ["Self", "1 round"],
  "Animate Dead": ["10 feet", "Instantaneous"], "Arcane Eye": ["30 feet", "Up to 1 hour"], "Arcane Lock": ["Touch", "Until dispelled"],
  "Augury": ["Self", "Instantaneous"], "Web": ["60 feet", "Up to 1 hour"], "Beacon of Hope": ["30 feet", "Up to 1 minute"],
  "Blindness/Deafness": ["30 feet", "1 minute"], "Blur": ["Self", "Up to 1 minute"], "Clairvoyance": ["1 mile", "Up to 10 minutes"],
  "Command": ["60 feet", "1 round"], "Continual Flame": ["Touch", "Until dispelled"], "Counterspell": ["60 feet", "Instantaneous"],
  "Create Food and Water": ["30 feet", "Instantaneous"], "Darkness": ["60 feet", "Up to 10 minutes"], "Darkvision": ["Touch", "8 hours"],
  "Daylight": ["60 feet", "1 hour"], "Dispel Magic": ["120 feet", "Instantaneous"], "Enhance Ability": ["Touch", "Up to 1 hour"],
  "Enlarge/Reduce": ["30 feet", "Up to 1 minute"], "Entangle": ["90 feet", "Up to 1 minute"], "Expeditious Retreat": ["Self", "Up to 10 minutes"],
  "Faerie Fire": ["60 feet", "Up to 1 minute"], "False Life": ["Self", "1 hour"], "Flaming Sphere": ["60 feet", "Up to 1 minute"],
  "Gentle Repose": ["Touch", "10 days"], "Grease": ["60 feet", "1 minute"], "Hold Person": ["60 feet", "Up to 1 minute"],
  "Jump": ["Touch", "1 minute"], "Lesser Restoration": ["Touch", "Instantaneous"], "Levitate": ["60 feet", "Up to 10 minutes"],
  "Locate Object": ["Self", "Up to 10 minutes"], "Magic Mouth": ["30 feet", "Until dispelled"], "Magic Weapon": ["Touch", "Up to 1 hour"],
  "Mirror Image": ["Self", "1 minute"], "Pass without Trace": ["Self", "Up to 1 hour"], "Prayer of Healing": ["30 feet", "Instantaneous"],
  "Protection from Poison": ["Touch", "1 hour"], "Ray of Enfeeblement": ["60 feet", "Up to 1 minute"], "Alter Self": ["Self", "Up to 1 hour"],
  "Scorching Ray": ["120 feet", "Instantaneous"], "See Invisibility": ["Self", "1 hour"], "Shatter": ["60 feet", "Instantaneous"],
};

const MAX_GUESSES = 6;
const EMPTY_STATS: GameStats = { played: 0, wins: 0, totalGuesses: 0, streak: 0, lastWin: "", distribution: [0, 0, 0, 0, 0, 0] };

function dayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function gameNumber() {
  const start = new Date(2026, 0, 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.floor((today - start) / 86400000) + 1;
}

function targetForToday() {
  return SPELLS[(gameNumber() * 17 + 5) % SPELLS.length];
}

function levelLabel(level: number) {
  return level === 0 ? "Cantrip" : `Level ${level}`;
}

function compareText(value: string, target: string): Result {
  return value === target ? "exact" : "wrong";
}

function compareList(value: string[], target: string[]): Result {
  if (value.length === target.length && value.every((entry) => target.includes(entry))) return "exact";
  return value.some((entry) => target.includes(entry)) ? "partial" : "wrong";
}

function rangeRank(value: string) {
  if (value === "Self") return 0;
  if (value === "Touch") return 1;
  const amount = Number.parseFloat(value);
  return value.includes("mile") ? amount * 5280 + 1 : amount + 1;
}

function durationLabel(value: string) {
  return value.replace(/^Up to /, "");
}

function durationRank(value: string) {
  const normalized = durationLabel(value);
  if (normalized === "Instantaneous") return 0;
  if (normalized === "Until dispelled") return Number.POSITIVE_INFINITY;
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

function comparison(guess: Spell, target: Spell) {
  const [guessRange, guessDuration] = SPELL_DETAILS[guess.name];
  const [targetRange, targetDuration] = SPELL_DETAILS[target.name];
  return {
    level: guess.level === target.level ? "exact" : guess.level < target.level ? "higher" : "lower",
    school: compareText(guess.school, target.school),
    components: compareList(guess.components, target.components),
    ritual: guess.ritual === target.ritual ? "exact" : "wrong",
    castingTime: compareText(guess.castingTime, target.castingTime),
    range: compareOrdered(guessRange, targetRange, rangeRank),
    duration: compareOrdered(durationLabel(guessDuration), durationLabel(targetDuration), durationRank),
  } satisfies Record<string, Result>;
}

function Cell({ label, value, result }: { label: string; value: string; result: Result }) {
  const arrow = result === "higher" ? " ↑" : result === "lower" ? " ↓" : "";
  const accessible = result === "exact" ? "Exact match" : result === "partial" ? "Partial match" : result === "higher" ? "Target value is higher" : result === "lower" ? "Target value is lower" : "No match";
  return <div className={`result-cell ${result}`} title={accessible}><span className="mobile-label">{label}</span><strong>{value}{arrow}</strong></div>;
}

function SpellIcon({ spell }: { spell?: Spell }) {
  if (!spell) return <>?</>;
  const Icon = spell.icon;
  return <Icon aria-hidden="true" />;
}

export default function Home() {
  const target = useMemo(targetForToday, []);
  const [selectedName, setSelectedName] = useState("");
  const [guesses, setGuesses] = useState<Spell[]>([]);
  const [showHow, setShowHow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [resultDismissed, setResultDismissed] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSpellNames, setShowSpellNames] = useState(true);
  const [stats, setStats] = useState<GameStats>(EMPTY_STATS);
  const [countdown, setCountdown] = useState("");
  const [tooltip, setTooltip] = useState<{ name: string; left: number; top: number } | null>(null);
  const won = guesses.some((guess) => guess.name === target.name);
  const finished = won || guesses.length >= MAX_GUESSES;
  const selectedSpell = SPELLS.find((spell) => spell.name === selectedName);

  useEffect(() => {
    const saved = localStorage.getItem(`zauberdle:${dayKey()}`);
    if (!saved) return;
    try {
      const names = JSON.parse(saved) as string[];
      setGuesses(names.map((name) => SPELLS.find((spell) => spell.name === name)).filter(Boolean) as Spell[]);
    } catch { /* Ignore invalid local data. */ }
  }, []);

  useEffect(() => {
    if (guesses.length) localStorage.setItem(`zauberdle:${dayKey()}`, JSON.stringify(guesses.map((guess) => guess.name)));
  }, [guesses]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zauberdle:stats");
      if (saved) setStats({ ...EMPTY_STATS, ...JSON.parse(saved) });
    } catch { /* Ignore invalid local data. */ }
    const update = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const seconds = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      setCountdown(`${hours}h ${String(minutes).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!finished) return;
    const recordKey = `zauberdle:recorded:${dayKey()}`;
    if (localStorage.getItem(recordKey)) return;
    let current = EMPTY_STATS;
    try { current = { ...EMPTY_STATS, ...JSON.parse(localStorage.getItem("zauberdle:stats") || "{}") }; } catch { /* Use defaults. */ }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
    const next: GameStats = {
      ...current,
      played: current.played + 1,
      wins: current.wins + (won ? 1 : 0),
      totalGuesses: current.totalGuesses + (won ? guesses.length : 0),
      streak: won ? (current.lastWin === yesterdayKey ? current.streak + 1 : 1) : 0,
      lastWin: won ? dayKey() : current.lastWin,
      distribution: current.distribution.map((value, index) => value + (won && index === guesses.length - 1 ? 1 : 0)),
    };
    localStorage.setItem("zauberdle:stats", JSON.stringify(next));
    localStorage.setItem(recordKey, "1");
    setStats(next);
  }, [finished, won, guesses.length]);

  function submit(name = selectedName) {
    if (finished) return;
    const guess = SPELLS.find((spell) => spell.name.toLowerCase() === name.trim().toLowerCase());
    if (!guess || guesses.includes(guess)) return;
    setGuesses((current) => [...current, guess]);
    setSelectedName("");
    if (guess.name === target.name || guesses.length + 1 >= MAX_GUESSES) setResultDismissed(false);
  }

  async function share() {
    const rows = guesses.map((guess) => Object.values(comparison(guess, target)).map((value) => value === "exact" ? "🟩" : value === "partial" ? "🟨" : value === "higher" ? "⬆️" : value === "lower" ? "⬇️" : "⬛").join(""));
    const text = `SPELLDLE #${gameNumber()} ${won ? guesses.length : "X"}/${MAX_GUESSES}\n${rows.join("\n")}\n\nWhich spell is hidden in the Arcane Archive today?`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function resetRound() {
    localStorage.removeItem(`zauberdle:${dayKey()}`);
    setGuesses([]);
    setSelectedName("");
    setResultDismissed(false);
    setShowStats(false);
  }

  function showSpellTooltip(element: HTMLElement, name: string) {
    const rect = element.getBoundingClientRect();
    const left = Math.max(110, Math.min(window.innerWidth - 110, rect.left + rect.width / 2));
    setTooltip({ name, left, top: rect.top - 8 });
  }

  return (
    <main>
      <header className="topbar" id="top">
        <a className="brand" href="#top" aria-label="Spelldle home"><span className="brand-rune">✦</span><strong>SPELLDLE</strong></a>
        <div className="game-tagline">THE DAILY ARCANE ARCHIVE</div>
        <div className="header-actions">
          <div className="attempts"><strong>{guesses.length}</strong><span>/ {MAX_GUESSES}</span></div>
          <button className="icon-button" onClick={resetRound} aria-label="Reset local test round" title="Reset test round">↻</button>
          <button className="icon-button" onClick={() => setShowHow(true)} aria-label="Show game rules">?</button>
        </div>
      </header>

      {tooltip && <div id="spell-tooltip" className="spell-tooltip" role="tooltip" style={{ left: tooltip.left, top: tooltip.top }}>{tooltip.name}</div>}

      <section className="play-shell">
        <article className="archive-panel">
          <div className="section-head"><div><span className="tiny-label">CHOOSE A</span><h2>Spell</h2></div><button className="name-toggle" type="button" aria-pressed={showSpellNames} onClick={() => { setShowSpellNames((current) => !current); setTooltip(null); }}><span>Names</span><strong>{showSpellNames ? "On" : "Off"}</strong></button></div>
          <div className={`spell-grid${showSpellNames ? "" : " names-hidden"}`}>
            {SORTED_SPELLS.map((spell) => {
              const used = guesses.includes(spell);
              const selected = selectedName === spell.name;
              const found = won && spell.name === target.name;
              return <button className={`spell-option${selected ? " selected" : ""}${used ? " used" : ""}${found ? " found" : ""}`} key={spell.name} onClick={() => { if (!used && !finished) setSelectedName(spell.name); }} onMouseEnter={showSpellNames ? undefined : (event) => showSpellTooltip(event.currentTarget, spell.name)} onMouseLeave={showSpellNames ? undefined : () => setTooltip(null)} onFocus={showSpellNames ? undefined : (event) => showSpellTooltip(event.currentTarget, spell.name)} onBlur={showSpellNames ? undefined : () => setTooltip(null)} disabled={used || finished} aria-describedby={!showSpellNames && tooltip?.name === spell.name ? "spell-tooltip" : undefined} aria-label={spell.name} aria-pressed={selected}><span className="option-sigil"><SpellIcon spell={spell} /></span>{showSpellNames && <strong>{spell.name}</strong>}</button>;
            })}
          </div>
        </article>

        <div className="game-console">
          <section className={`selection-stage${selectedSpell ? " has-selection" : ""}`}>
            <div className="selected-sigil" aria-hidden="true"><SpellIcon spell={selectedSpell} /></div>
            <div className="selected-copy"><span className="tiny-label">YOUR GUESS</span><h1>{selectedSpell?.name || "Choose a spell"}</h1><p>{selectedSpell ? "Ready to cast your guess." : "Select an entry from the Arcane Archive."}</p></div>
            <button className="primary submit-guess" onClick={() => submit()} disabled={!selectedName || finished}>CAST</button>
          </section>

          <article className="results-panel" aria-label="Your guesses">
            <div className="section-head results-head"><div><span className="tiny-label">ARCANE ARCHIVE #{gameNumber()}</span><h2>The Signs</h2></div></div>
            <div className="table-scroll">
              <div className="table-head"><span>Spell</span><span>Level</span><span>School</span><span>Components</span><span>Ritual</span><span>Casting</span><span>Range</span><span>Duration</span></div>
              <div className="rows">
                {guesses.map((guess, index) => {
                  const result = comparison(guess, target);
                  const solved = guess.name === target.name;
                  return <div className={`result-row${solved ? " solved" : ""}`} key={guess.name} style={{ animationDelay: `${index * 40}ms` }}><div className={`spell-cell${solved ? " exact" : ""}`} role="img" tabIndex={0} aria-label={guess.name} aria-describedby={tooltip?.name === guess.name ? "spell-tooltip" : undefined} onMouseEnter={(event) => showSpellTooltip(event.currentTarget, guess.name)} onMouseLeave={() => setTooltip(null)} onFocus={(event) => showSpellTooltip(event.currentTarget, guess.name)} onBlur={() => setTooltip(null)}><span className="row-sigil"><SpellIcon spell={guess} /></span><span className="sr-only">{guess.name}</span></div><Cell label="Spell level" value={levelLabel(guess.level)} result={result.level} /><Cell label="School" value={guess.school} result={result.school} /><Cell label="Components" value={guess.components.join(" · ")} result={result.components} /><Cell label="Ritual" value={guess.ritual ? "Yes" : "No"} result={result.ritual} /><Cell label="Casting time" value={guess.castingTime} result={result.castingTime} /><Cell label="Range" value={SPELL_DETAILS[guess.name][0]} result={result.range} /><Cell label="Duration" value={durationLabel(SPELL_DETAILS[guess.name][1])} result={result.duration} /></div>;
                })}
                {Array.from({ length: Math.max(0, MAX_GUESSES - guesses.length) }).map((_, index) => <div className="empty-row" key={index}><span>{guesses.length + index + 1}</span><i /><i /><i /><i /><i /><i /><i /></div>)}
              </div>
            </div>
          </article>
        </div>
      </section>

      {showHow && <div className="modal-backdrop" onMouseDown={() => setShowHow(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="how-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowHow(false)} aria-label="Close">×</button><div className="panel-kicker">HOW TO PLAY</div><h2 id="how-title">Find the spell</h2><p className="how-intro">You have six guesses. Compare each result to uncover the spell hidden in the Arcane Archive.</p><div className="how-steps"><div className="how-step"><strong>1</strong><span>Choose a spell from the archive and cast your guess.</span></div><div className="how-step"><strong>2</strong><span>Use the colors to compare all seven spell properties.</span></div><div className="how-step"><strong>3</strong><span>Arrows for level, range and duration point toward the target.</span></div></div><div className="legend modal-legend"><span><i className="swatch exact" />Exact</span><span><i className="swatch partial" />Partial</span><span><i className="swatch wrong" />No match</span></div><div className="credits"><strong>ICON CREDITS</strong><p>Spell icons by Lorc, Delapouite and the contributors of <a href="https://game-icons.net/" target="_blank" rel="noreferrer">Game-icons.net</a>, used under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a>.</p></div></div></div>}

      {finished && !resultDismissed && <div className="result-backdrop" role="presentation"><section className="result-popup" role="dialog" aria-modal="true" aria-labelledby="result-title"><button className="popup-close" onClick={() => setResultDismissed(true)} aria-label="Close result">×</button><span className="reveal-sigil"><SpellIcon spell={target} /></span><div className="result-kicker">{won ? `SOLVED IN ${guesses.length} GUESSES` : "THE ARCANE ARCHIVE CLOSES"}</div><h2 id="result-title">{target.name}</h2><p>{levelLabel(target.level)} · {target.school} · {SPELL_DETAILS[target.name][0]} · {durationLabel(SPELL_DETAILS[target.name][1])}</p><div className="share-grid" aria-label="Your result">{guesses.map((guess) => Object.values(comparison(guess, target)).map((value, index) => <i key={`${guess.name}-${index}`} className={`share-dot ${value}`} />))}</div><div className="next-game"><span>NEXT SPELL IN</span><strong>{countdown}</strong></div><div className="result-actions"><button className="primary" onClick={share}>{copied ? "COPIED ✓" : "SHARE RESULT"}</button><button className="stats-button" onClick={() => setShowStats((value) => !value)}>{showStats ? "HIDE" : "STATISTICS"}</button></div>{showStats && <div className="stats-drawer"><div className="stat"><strong>{stats.played}</strong><span>PLAYED</span></div><div className="stat"><strong>{stats.played ? Math.round((stats.wins / stats.played) * 100) : 0}%</strong><span>WON</span></div><div className="stat"><strong>{stats.wins ? (stats.totalGuesses / stats.wins).toFixed(1) : "–"}</strong><span>AVG. GUESSES</span></div><div className="stat"><strong>{stats.streak}</strong><span>STREAK</span></div><div className="distribution">{stats.distribution.map((value, index) => <div key={index}><span>{index + 1}</span><i style={{ width: `${Math.max(8, stats.wins ? (value / Math.max(...stats.distribution, 1)) * 100 : 8)}%` }}>{value}</i></div>)}</div></div>}</section></div>}
    </main>
  );
}
