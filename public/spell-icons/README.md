# Pixel spell icons

Artwork licensed by **[Clockwork Raven](https://clockworkraven.itch.io/)** (62 icons) and
**[Franuka](https://franuka.itch.io/)** (10 icons). The inspected Raven
palette notes credit **Resurrect 64 by Kerrie Lake**.

This directory contains icons for all 72 spells, including the user's sixteen
selected replacements. They come exclusively from the user's existing
`Assets&Stock/itch.io` library. The selection includes 26 direct motifs and 46
symbolic approximations; these are Spelldle's mappings, not official names from
the packs. Each of the 72 spells uses a distinct original artwork.

- 64 individual PNGs are copied byte for byte.
- 8 spritesheet cells are extracted without resizing, recoloring or redrawing.
- Native dimensions are retained: 64 images at 16 x 16, 6 at 32 x 32 and 2 at
  64 x 64. Display scaling belongs to the game's CSS.
- All 72 original Game-icons.net SVGs remain available as image-load error
  fallbacks; no spell normally uses an SVG anymore.

The selected replacements are:

| Spell | Selected motif |
| --- | --- |
| Arcane Lock | Golden padlock |
| Blur | Offset silhouette |
| Burning Hands | Broad cone of fire |
| Counterspell | Pink magical burst, interpreted as disrupted magic |
| Entangle | Grasping roots |
| False Life | Violet heart |
| Feather Fall | Golden magical feather |
| Fly | Spread pale wings |
| Fog Cloud | Wispy motif displayed in grayscale |
| Hold Person | Person held in a magical bind |
| Invisibility | Disappearing figure |
| Guidance | Hand with light |
| Mage Hand | Magical hand |
| Mirror Image | Purple figure with two afterimages |
| Revivify | Glowing heart |
| Shatter | Broken stone |

All sixteen replacements are unmodified original 16 x 16 PNGs. Blur's source
is named "Blink" in Franuka's index, Counterspell's is named "Mana explosion",
and Feather Fall's is named "Fly"; their use here is an intentional visual
association. Mage Hand's source is named "Mage hand" and directly matches that
spell.

Fog Cloud uses a byte-identical copy of the original `S386.png` from Raven
pack 36. A scoped `grayscale(1)` filter in `src/spell-icons.css` displays Fog
Cloud in gray with no extra brightness adjustment. This is the only
spell-specific color adjustment; the source and bundled PNG remain unchanged,
with no new or edited bitmap.

`sources.json` records each source path relative to the local `itch.io` folder,
the source and output SHA-256 hashes, source and output dimensions, exact crop
coordinates where applicable, mapping confidence and selection notes. The
runtime mapping is `src/spell-icons.generated.json` in the project repository.

To reproduce a sprite, copy its `source_relative_to_itch_io` file unchanged when
`crop_xywh` is null. Otherwise extract the specified `[x, y, width, height]`
rectangle using top-left pixel coordinates and save it as PNG without scaling
or color changes. Cropped PNG encoding may differ between software versions;
the resulting RGBA pixels must be identical to the source rectangle.

## Sources, artists and licenses

The Raven packs are Wizard Skills (05), Acolyte Skills (07), Rogue Skills (08),
Warrior Skills (09), Farming/Food/Beverages (10), General Itens and Tools (12),
Skills and Spells (22), Attributes/Menu/States (25), Fantasy Masks (27), Raven
Fantasy Icons (29), Attributes/Skills/Spells (36), and Pets and Animals. Their
local notes identify the studio and/or palette. The exact note paths and hashes
are in `sources.json`; the publication terms below were checked against the
creator's official pages on 2026-10-09.

Clockwork Raven's [User Asset License Agreement v1.2](RAVEN-LICENSE-v1.2.pdf)
is copied unchanged from the [official live-license folder](https://drive.google.com/drive/folders/121s8vaEk2h2Y-3cHDlfkKcwojsySYh3q).
It allows personal and commercial games, asset modification, and project-related
screenshots and videos. It does not permit distributing the artwork as a separate
asset product or granting other people independent reuse rights. These
conditions also apply to modified artwork.

On the [400+ Skills and Spells product page](https://clockworkraven.itch.io/rpg-icon-pack-400-skills-and-spells-clockwork-raven-studios),
the creator explicitly permits an open-source game when its users are told that
the asset files cannot be taken for other projects ([author's clarification](https://itch.io/post/9029721)).
The same page confirms that the packs use the same license.

**The Raven files in this repository are included only as part of Spelldle.
They may not be extracted, redistributed as assets, or reused in other projects
under this repository's license. Obtain your own permission or license from
Clockwork Raven for other uses.** This restriction concerns Raven artwork only;
it does not replace the CC BY licenses of Franuka or Game-icons.net artwork.

The [Wizard](https://clockworkraven.itch.io/raven-fantasy-pixel-art-rpg-icons-wizard-skills),
[Acolyte](https://clockworkraven.itch.io/raven-fantasy-pixel-art-rpg-icons-acolyte-skills),
[Rogue](https://clockworkraven.itch.io/raven-fantasy-pixel-art-rpg-icons-rogue-skills)
and [Warrior](https://clockworkraven.itch.io/raven-fantasy-pixel-art-rpg-icons-fighter-skills)
packs credit **[Skull Jelly](https://x.com/Skull_inaJelly)** as the commissioned
artist. Their seven selected icons represent Detect Magic, Guidance, Revivify,
False Life, Mirror Image, Prayer of Healing and Command. The 35 selected icons
from [Attributes, Skills, Spells and Scores](https://clockworkraven.itch.io/raven-fantasy-pixel-art-rpg-icons-attributes-skills-spells-and-scores)
come from a pack made by Clockwork Raven with **[Manowell](https://www.instagram.com/manowellplayed/)**.
The remaining 20 Raven icons retain the studio credit. Per-file artist and
licensor metadata are recorded in `sources.json`.

Franuka's ten icons come from `48 - RPG Icon pack`: Alarm from expansion 04,
Arcane Lock from the base set, and Blur, Counterspell, Entangle, Feather Fall, Fly,
Hold Person, Invisibility and Mage Hand from expansion 03 (Spells). The original
pack's `License and index.txt` explicitly states **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**
and requests a link to the artist's itch.io page and/or X. Its complete original
notice is bundled byte for byte as
[FRANUKA-LICENSE-AND-INDEX.txt](FRANUKA-LICENSE-AND-INDEX.txt). The source pixels
are unchanged; only the filenames and display sizes differ.

These third-party images are **not covered by this repository's MIT license**.
Franuka's license applies to those ten icons, not to the Raven images.

The existing Game-icons.net SVG artwork has separate CC BY 3.0 attribution in
the application and repository credits; that license does not apply to the
Raven PNGs.
