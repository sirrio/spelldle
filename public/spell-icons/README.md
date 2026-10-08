# Raven spell icons (local preview)

Artwork: **Caio / Clockwork Raven Studios**. The local palette notes credit
**Resurrect 64 by Kerrie Lake**.

This directory contains the 65 icons selected in the approved local mockup.
They come exclusively from the user's existing `Assets&Stock/itch.io/Clockwork
Raven` library. The selection includes 22 direct motifs and 43 symbolic
approximations; these are Spelldle's mappings, not official names from the packs.

- 56 individual PNGs are copied byte for byte.
- 9 spritesheet cells are extracted without resizing, recoloring or redrawing.
- Native dimensions are retained: 56 images at 16 x 16, 8 at 32 x 32 and 1 at
  64 x 64. Display scaling belongs to the game's CSS.
- Alarm, Blindness/Deafness, Command, Create Food and Water, Dispel Magic,
  Magic Mouth and Alter Self retain their existing Game-icons.net icons.

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

The inspected packs are Wizard Skills (05), Acolyte Skills (07), Rogue Skills
(08), General Itens and Tools (12), Skills and Spells (22), Fantasy Masks (27),
Raven Fantasy Icons (29), Attributes/Skills/Spells (36), and Pets and Animals.
Their available notes identify the artist and/or palette but contain no explicit
license grant. The exact inspected note paths and hashes are in `sources.json`.

These third-party images are **not covered by this repository's MIT license**.
This local integration does not assign them a CC0 or CC BY license. Publication
rights have not been verified; the current work is limited to the user's local
preview. No replacement or invented license text is included.

The existing Game-icons.net SVG artwork has separate CC BY 3.0 attribution in
the application and repository credits; that license does not apply to the
Raven PNGs.
