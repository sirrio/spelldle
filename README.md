# Spelldle

A daily Wordle-style guessing game for spells from the 2024 D&D rules in SRD 5.2.1. Compare seven spell properties and uncover the entry hidden in the Arcane Archive in six guesses.

✨ **Live:** https://sirrio.github.io/spelldle/

## Features

- 📖 **72 SRD 5.2.1 spells** in a compact 8 × 9 visual archive
- 🧩 Seven comparison fields: level, school, components, ritual, casting time, range, and duration
- 🟩 Exact, 🟨 partial, and directional higher/lower clues
- 🌍 One shared daily spell worldwide, changing at midnight UTC
- 💾 Local progress, statistics, streaks, and guess distribution via `localStorage`
- 👁 Optional spell names with accessible icon tooltips
- 📱 Responsive layout for desktop and mobile

## How the daily spell works

The current UTC date produces a deterministic game number. That number selects one spell from the archive, so every player receives the same puzzle without requiring a backend. An open game automatically reloads when the UTC day changes.

## Running locally

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Create the production build with:

```sh
npm run build
```

The local development URL and health check is `http://127.0.0.1:5173/` (HTTP 200).
For a live-equivalent preview, build first, then run
`npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` and check
`http://127.0.0.1:4173/`. Browser checks require one of these servers; catalog
tests and builds do not. The user normally manages the local server.

On Windows PowerShell, use `npm.cmd` instead of `npm` if the PowerShell wrapper
does not forward the flags after `--` correctly.

### Local book UI prototype

The `release/1.1.0` book-style prototype is local only; do not push or deploy it
without a subsequent user instruction. Its skin is scoped to Spelldle and does
not alter `dndle-core`, the daily sequence or storage.

The local icon preview covers all 72 spells with original pixel artwork from
the existing asset library: 71 Clockwork Raven icons and Franuka's bell for
Alarm. All 72 original Game-icons.net SVGs remain available if an image cannot
load. The same icon is used in the archive, selection, guess rows and result dialog.

`src/spell-icons.generated.json` maps spell names to bundled PNGs.
`public/spell-icons/sources.json` records original paths, crop coordinates,
dimensions, hashes and the rationale for each visual association. The source
pixels and colors are unchanged. See [asset notes](public/spell-icons/README.md)
for provenance, Franuka's bundled license and the still-unverified Raven
publication license. These images are part of the local prototype only.

Original WizardBook PNGs in `public/book-ui` are drawn with CSS nine-slice
borders: cover 32px; left page 3/1/3/8px, right page 3/8/3/1px; buttons 6/3/5/3px; slots 6/4/6/4px (top/right/bottom/left source pixels). Desktop
shows a two-page spread with the 8 × 9 archive; narrow screens stack the pages.
`sources.json` records the exact original filenames and SHA-256 hashes.

## Deploying

GitHub Actions builds the site and deploys `dist/` to **GitHub Pages** after every push to `main`.

## Credits

This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at [dndbeyond.com/srd](https://www.dndbeyond.com/srd). The SRD 5.2.1 is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).

Pixel spell icons by Caio / Clockwork Raven Studios, with the Alarm bell by
[Franuka](https://franuka.itch.io/) from the RPG Icon pack, used under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Resurrect 64 palette by Kerrie Lake, as credited
in the Raven pack notes. These images are not covered by this repository's MIT
license. See [icon source notes](public/spell-icons/README.md) for the local
source licenses and publication status.

Fallback spell icons by Lorc, Delapouite, and the contributors of [Game-icons.net](https://game-icons.net/), used under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## License

Book UI artwork by [Crusenho Agus Hennihuno](https://crusenho.itch.io/complete-ui-book-styles-pack),
from the Complete UI Book Styles Pack (WizardBook). Original PNGs are unmodified;
their layout and nine-slice display are adapted for Spelldle. This artwork uses
the creator's custom license in [public/book-ui/LICENSE.txt](public/book-ui/LICENSE.txt),
not this repository's MIT license. The full purchased pack is not included.

The original source code is available under the [MIT License](LICENSE). SRD material and icons remain subject to their respective licenses above.

WizardBook sprites render at an integer 2x pixel scale with nearest-neighbor
rendering. Cover corner slices (64px display) are independent of the 24px
layout inset, matching the original layered book construction.

## Book theme implementation

`src/book-layout.css` is intentionally identical in Spelldle and Critterdle.
Until a coordinated core release, keep the two local copies in sync. The
project-specific `src/index.css` contains only palette and original sprite
metrics and stylesheet imports; `src/spell-icons.css` handles Spelldle's pixel
icon sizing. Both games use the same page sizes, content insets, controls,
84px mobile cards and 4/3/2-column mobile breakpoints. Sprite pixels render at
2x; corner painting is independent of layout spacing. Modal padding is explicit.
Used entries remain legible and the found entry retains full opacity.
Button labels move with the original pressed artwork without shifting hit areas.

WizardBook slots use asymmetric source slices 6/4/6/4 to preserve their highlights.
