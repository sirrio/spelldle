import type { IconType } from "react-icons";
import {
  GiAcidBlob, GiAngelWings, GiAnvilImpact, GiBlindfold, GiBodySwapping,
  GiBrokenShield, GiBroadsword, GiCat, GiCharm, GiCometSpark, GiCrystalBall,
  GiCrystalEye, GiDominoMask, GiEclipse, GiEyeball, GiFairyWand, GiFeather,
  GiFeatheredWing, GiFireball, GiFirePunch, GiFireRay, GiFlameSpin, GiFog,
  GiFootprint, GiGiant, GiHalfDead, GiHandOfGod, GiHealing, GiHealingShield,
  GiHeartPlus, GiHeartShield, GiHeartWings, GiImprisoned, GiInvisible,
  GiLanternFlame, GiLeatherBoot, GiLips, GiMagicPalm, GiMagicShield, GiMagicSwirl,
  GiMagickTrick, GiMagnifyingGlass, GiMuscleUp, GiNightSleep, GiNightVision,
  GiOilySpiral, GiOpenPalm, GiPadlock, GiPathDistance, GiPointing, GiPoisonBottle,
  GiPrayer, GiRaiseSkeleton, GiRingedBeam, GiRingingBell, GiScrollQuill,
  GiShadowFollower, GiShieldBounces, GiShieldReflect, GiShiningHeart,
  GiSkeletonKey, GiSparkles, GiSpiderWeb, GiSun, GiTeleport, GiThreeFriends,
  GiTombstone, GiTowerFall, GiVineLeaf, GiWarlockEye, GiWingfoot, GiBread,
} from "react-icons/gi";
import spellData from "./spells.generated.json";

export type Spell = {
  name: string;
  level: number;
  school: string;
  components: string[];
  ritual: boolean;
  castingTime: string;
  range: string;
  duration: string;
  icon: IconType;
};

const ICONS: Record<string, IconType> = {
  "Acid Splash": GiAcidBlob, "Alarm": GiRingingBell, "Aid": GiHeartShield,
  "Sleep": GiNightSleep, "Bless": GiAngelWings, "Burning Hands": GiFirePunch,
  "Charm Person": GiCharm, "Comprehend Languages": GiScrollQuill, "Cure Wounds": GiHealing,
  "Detect Magic": GiMagicSwirl, "Disguise Self": GiDominoMask, "Feather Fall": GiFeather,
  "Find Familiar": GiCat, "Fireball": GiFireball, "Fly": GiFeatheredWing,
  "Fog Cloud": GiFog, "Guidance": GiHandOfGod, "Healing Word": GiHeartWings,
  "Identify": GiMagnifyingGlass, "Invisibility": GiInvisible, "Knock": GiSkeletonKey,
  "Light": GiSparkles, "Mage Armor": GiMagicShield, "Mage Hand": GiMagicPalm,
  "Magic Missile": GiCometSpark, "Mending": GiAnvilImpact, "Misty Step": GiTeleport,
  "Prestidigitation": GiMagickTrick, "Revivify": GiHeartPlus, "Shield": GiShieldReflect,
  "Animate Dead": GiRaiseSkeleton, "Arcane Eye": GiCrystalEye, "Arcane Lock": GiPadlock,
  "Augury": GiCrystalBall, "Web": GiSpiderWeb, "Beacon of Hope": GiShiningHeart,
  "Blindness/Deafness": GiBlindfold, "Blur": GiShadowFollower, "Clairvoyance": GiWarlockEye,
  "Command": GiPointing, "Continual Flame": GiLanternFlame, "Counterspell": GiShieldBounces,
  "Create Food and Water": GiBread, "Darkness": GiEclipse, "Darkvision": GiNightVision,
  "Daylight": GiSun, "Dispel Magic": GiBrokenShield, "Enhance Ability": GiMuscleUp,
  "Enlarge/Reduce": GiGiant, "Entangle": GiVineLeaf, "Expeditious Retreat": GiLeatherBoot,
  "Faerie Fire": GiFairyWand, "False Life": GiHalfDead, "Flaming Sphere": GiFlameSpin,
  "Gentle Repose": GiTombstone, "Grease": GiOilySpiral, "Hold Person": GiImprisoned,
  "Jump": GiWingfoot, "Lesser Restoration": GiHealingShield, "Levitate": GiOpenPalm,
  "Locate Object": GiPathDistance, "Magic Mouth": GiLips, "Magic Weapon": GiBroadsword,
  "Mirror Image": GiThreeFriends, "Pass without Trace": GiFootprint, "Prayer of Healing": GiPrayer,
  "Protection from Poison": GiPoisonBottle, "Ray of Enfeeblement": GiRingedBeam,
  "Alter Self": GiBodySwapping, "Scorching Ray": GiFireRay, "See Invisibility": GiEyeball,
  "Shatter": GiTowerFall,
};

export const SPELLS: Spell[] = spellData.map((spell) => ({ ...spell, icon: ICONS[spell.name] }));
