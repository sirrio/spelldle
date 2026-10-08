# Pixel spell icons (local preview)

Artwork: **Caio / Clockwork Raven Studios** (71 icons) and
**[Franuka](https://franuka.itch.io/)** (Alarm's bell). The inspected Raven
palette notes credit **Resurrect 64 by Kerrie Lake**.

This directory contains icons for all 72 spells: the initial 65-icon mockup and
the user's approved first choice for each of the seven remaining spells.
They come exclusively from the user's existing `Assets&Stock/itch.io` library.
The selection includes 24 direct motifs and 48 symbolic
approximations; these are Spelldle's mappings, not official names from the packs.

- 62 individual PNGs are copied byte for byte.
- 10 spritesheet cells are extracted without resizing, recoloring or redrawing.
- Native dimensions are retained: 62 images at 16 x 16, 8 at 32 x 32 and 2 at
  64 x 64. Display scaling belongs to the game's CSS.
- The additions are Alarm (bell), Alter Self (exchanging figures),
  Blindness/Deafness (crossed-out eye), Command (shouting head), Create Food and
  Water (bread), Dispel Magic (magic with down arrow), and Magic Mouth (speech
  bubble). Blindness/Deafness retains the exact approved 64 x 64 original.
- All 72 original Game-icons.net SVGs remain available as image-load error
  fallbacks; no spell normally uses an SVG anymore.

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

The Raven packs are Wizard Skills (05), Acolyte Skills (07), Rogue Skills (08),
Warrior Skills (09), Farming/Food/Beverages (10), General Itens and Tools (12),
Skills and Spells (22), Attributes/Menu/States (25), Fantasy Masks (27), Raven
Fantasy Icons (29), Attributes/Skills/Spells (36), and Pets and Animals. Their
available notes identify the artist and/or palette but contain no explicit
license grant. Publication rights for these 71 Raven icons remain unverified.
The exact inspected note paths and hashes are in `sources.json`.

Franuka's Alarm bell comes from `48 - RPG Icon pack`, expansion 04. The original
pack's `License and index.txt` explicitly states **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**
and requests a link to the artist's itch.io page and/or X. Its complete original
notice is bundled byte for byte as
[FRANUKA-LICENSE-AND-INDEX.txt](FRANUKA-LICENSE-AND-INDEX.txt). The bell's pixels
are unchanged; only the filename and display size differ.

These third-party images are **not covered by this repository's MIT license**.
Franuka's license applies to the bell, not to the Raven images. The current
integration remains a local preview.

The existing Game-icons.net SVG artwork has separate CC BY 3.0 attribution in
the application and repository credits; that license does not apply to the
Raven PNGs.
