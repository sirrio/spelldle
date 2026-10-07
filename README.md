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
not alter `dndle-core`, the daily sequence, storage or the spell icons.

Original TravelBook PNGs in `public/book-ui` are drawn with CSS nine-slice
borders: cover 12px, pages 8px, buttons 6px, slots 4px (source pixels). Desktop
shows a two-page spread with the 8 × 9 archive; narrow screens stack the pages.
`sources.json` records the exact original filenames and SHA-256 hashes.

## Deploying

GitHub Actions builds the site and deploys `dist/` to **GitHub Pages** after every push to `main`.

## Credits

This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at [dndbeyond.com/srd](https://www.dndbeyond.com/srd). The SRD 5.2.1 is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).

Spell icons by Lorc, Delapouite, and the contributors of [Game-icons.net](https://game-icons.net/), used under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## License

Book UI artwork by [Crusenho Agus Hennihuno](https://crusenho.itch.io/complete-ui-book-styles-pack),
from the Complete UI Book Styles Pack (TravelBook). Original PNGs are unmodified;
their layout and nine-slice display are adapted for Spelldle. This artwork uses
the creator's custom license in [public/book-ui/LICENSE.txt](public/book-ui/LICENSE.txt),
not this repository's MIT license. The full purchased pack is not included.

The original source code is available under the [MIT License](LICENSE). SRD material and icons remain subject to their respective licenses above.
