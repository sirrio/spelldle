# Pixel spell icons (local preview)

Artwork: **Caio / Clockwork Raven Studios** (63 icons) and
**[Franuka](https://franuka.itch.io/)** (9 icons). The inspected Raven
palette notes credit **Resurrect 64 by Kerrie Lake**.

This directory contains icons for all 72 spells, including the user's thirteen
selected replacements. They come exclusively from the user's existing
`Assets&Stock/itch.io` library. The selection includes 26 direct motifs and 46
symbolic approximations; these are Spelldle's mappings, not official names from
the packs.

- 63 individual PNGs are copied byte for byte.
- 9 spritesheet cells are extracted without resizing, recoloring or redrawing.
- Native dimensions are retained: 63 images at 16 x 16, 7 at 32 x 32 and 2 at
  64 x 64. Display scaling belongs to the game's CSS.
- All 72 original Game-icons.net SVGs remain available as image-load error
  fallbacks; no spell normally uses an SVG anymore.

The selected replacements are:

| Spell | Selected motif |
| --- | --- |
| Arcane Lock | Golden padlock |
| Burning Hands | Broad cone of fire |
| Counterspell | Pink magical burst, interpreted as disrupted magic |
| Entangle | Grasping roots |
| False Life | Violet heart |
| Feather Fall | Golden magical feather |
| Fly | Spread pale wings |
| Hold Person | Person held in a magical bind |
| Invisibility | Disappearing figure |
| Guidance | Hand with light |
| Mage Hand | Magical hand |
| Revivify | Glowing heart |
| Shatter | Broken stone |

Fog Cloud retains its previous icon; its replacement choice remains open.
All thirteen replacements are unmodified original 16 x 16 PNGs. Counterspell's
source is named "Mana explosion" in Franuka's index, and Feather Fall's source
is named "Fly"; their use here is an intentional visual association. Mage
Hand's source is named "Mage hand" and directly matches that spell.

`sources.json` records each source path relative to the local `itch.io` folder,
the source and output SHA-256 hashes, source and output dimensions, exact crop
coordinates where applicable, mapping confidence and selection notes. The
runtime mapping is `src/spell-icons.generated.json` in the project repository.

To reproduce a sprite, copy its `source_relative_to_itch_io` file unchanged when
`crop_xywh` is null. Otherwise extract the specified `[x, y, width, height]`
rectangle using top-left pixel coordinates and save it as PNG without scaling
or color changes. Cropped PNG encoding may differ between software versions;
the resulting RGBA pixels must be identical to the source rectangle.

## Local source and licensing status

The Raven packs are Wizard Skills (05), Acolyte Skills (07), Warrior Skills (09),
Farming/Food/Beverages (10), General Itens and Tools (12),
Skills and Spells (22), Attributes/Menu/States (25), Fantasy Masks (27), Raven
Fantasy Icons (29), Attributes/Skills/Spells (36), and Pets and Animals. Their
available notes identify the artist and/or palette but contain no explicit
license grant. Publication rights for these 63 Raven icons remain unverified.
The exact inspected note paths and hashes are in `sources.json`.

Franuka's nine icons come from `48 - RPG Icon pack`: Alarm from expansion 04,
Arcane Lock from the base set, and Counterspell, Entangle, Feather Fall, Fly,
Hold Person, Invisibility and Mage Hand from expansion 03 (Spells). The original
pack's `License and index.txt` explicitly states **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**
and requests a link to the artist's itch.io page and/or X. Its complete original
notice is bundled byte for byte as
[FRANUKA-LICENSE-AND-INDEX.txt](FRANUKA-LICENSE-AND-INDEX.txt). The source pixels
are unchanged; only the filenames and display sizes differ.

These third-party images are **not covered by this repository's MIT license**.
Franuka's license applies to those nine icons, not to the Raven images. The
current integration remains a local preview.

The existing Game-icons.net SVG artwork has separate CC BY 3.0 attribution in
the application and repository credits; that license does not apply to the
Raven PNGs.
