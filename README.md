# Spelldle

A daily Wordle-style guessing game for spells from the 2024 D&D rules in SRD 5.2.1. Compare seven spell properties and uncover the entry hidden in the Arcane Archive in seven guesses.

✨ **Current deployment:** https://sirrio.github.io/spelldle/

**Custom domain prepared locally:** https://spelldle.com/ — see the cutover notes below.

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

### Book UI release candidate

The `release/1.1.0` book theme is in the authorized PR phase; deployment remains
pending the coordinated release. Its skin is scoped to Spelldle. The local
`dndle-core` candidate adds seven guesses, compact selection controls and a
results list that grows as guesses are submitted. The daily sequence and storage
namespace are unchanged; completed six-guess rounds retain their original limit,
and existing statistics are preserved when adding the seventh distribution slot.
The pinned dependency remains unchanged until a coordinated core release.
Catalog tests retain the stronger guarantee that every spell can be found within
six guesses.

The icon set covers all 72 spells with original pixel artwork from
the existing asset library: 62 Clockwork Raven icons and 10 Franuka icons.
All 72 original Game-icons.net SVGs remain available if an image cannot
load. The same icon is used in the archive, selection, guess rows and result dialog.

`src/spell-icons.generated.json` maps spell names to bundled PNGs.
`public/spell-icons/sources.json` records original paths, crop coordinates,
dimensions, hashes and the rationale for each visual association. The source
PNG pixels and colors are unchanged. Fog Cloud uses the original Raven S386
artwork and is displayed in grayscale through CSS.
See [asset notes](public/spell-icons/README.md) for provenance, the bundled
licenses and the creators' publication terms. Raven artwork is included only as
part of Spelldle: it may not be extracted, redistributed as assets or reused in
other projects under this repository's license. Obtain your own permission or
license from Clockwork Raven for other uses.

Original WizardBook PNGs in `public/book-ui` are drawn with CSS nine-slice
borders: cover 32px; left page 3/1/3/8px, right page 3/8/3/1px; buttons 6/3/5/3px; slots 6/4/6/4px (top/right/bottom/left source pixels). Desktop
shows a two-page spread with the 8 × 9 archive; narrow screens stack the pages.
`sources.json` records the exact original filenames and SHA-256 hashes.

## Deploying

GitHub Actions builds the site and deploys `dist/` to **GitHub Pages** after every push to `main`.

### Custom domain cutover

The local release prepares `https://spelldle.com/` as the canonical address.
Share links, social images and the sibling-game link use the new domains.
This does not itself change the deployed site or DNS. Keep this status current
when the coordinated cutover is completed.

Domain ownership was verified in the GitHub account on 2026-10-09. The
`_github-pages-challenge-sirrio` TXT record is installed in ALL-INKL and must
remain in place. The web DNS and repository custom-domain switch are pending
the coordinated release; verification alone does not redirect visitors.

Verify the domain in GitHub first, retain its verification TXT record, then set
`spelldle.com` as the repository's Pages custom domain before changing web DNS.
The intended ALL-INKL records are:

| Name | Type | Value |
| --- | --- | --- |
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `sirrio.github.io.` |

Replace conflicting web records; preserve mail records. The `www` alias redirects
to the apex domain. Enable Enforce HTTPS once GitHub's certificate is ready.
This repository deploys through Actions, so no `CNAME` file is required.
See [GitHub's domain setup guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

Vite retains `base: "./"`; built assets and the favicon work at the domain root
and under the legacy `/spelldle/` path. Check both origins, HTTPS, the `www`
redirect, share/sibling links and social-image URLs after deployment.

Browser progress belongs to its origin. The domain switch preserves the storage
namespace and does not erase the old `sirrio.github.io` data, but existing rounds,
statistics and streaks are not automatically transferred to `spelldle.com`.

## Credits

This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at [dndbeyond.com/srd](https://www.dndbeyond.com/srd). The SRD 5.2.1 is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).

62 pixel spell icons licensed by [Clockwork Raven](https://clockworkraven.itch.io/),
including commissioned artwork by [Skull Jelly](https://x.com/Skull_inaJelly)
and the Attributes, Skills, Spells and Scores pack made with
[Manowell](https://www.instagram.com/manowellplayed/). Ten icons by
[Franuka](https://franuka.itch.io/) from the RPG Icon pack, used under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Franuka's artwork is
used for Alarm, Arcane Lock, Blur, Counterspell, Entangle, Feather Fall, Fly, Hold
Person, Invisibility and Mage Hand. Resurrect 64 palette by Kerrie Lake, as credited
in the Raven pack notes. These images are not covered by this repository's MIT
license. See [icon source notes](public/spell-icons/README.md) for the local
source licenses, artist mapping and the author's open-source-project clarification.

Fallback spell icons by Lorc, Delapouite, and the contributors of [Game-icons.net](https://game-icons.net/), used under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## License

Book UI artwork by [Crusenho Agus Hennihuno](https://crusenho.itch.io/complete-ui-book-styles-pack),
from the Complete UI Book Styles Pack (WizardBook). Original PNGs are unmodified;
their layout and nine-slice display are adapted for Spelldle. This artwork uses
the creator's custom license in [public/book-ui/LICENSE.txt](public/book-ui/LICENSE.txt),
not this repository's MIT license. The full purchased pack is not included.
Crusenho [confirms use in an online game with disclosed sources](https://itch.io/post/13320970).
Only the nine sprites needed by this game are included. Their presence does not
grant permission to extract or republish the pack as a separate asset collection;
obtain the artwork and its license from the creator for your own projects.

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
84px mobile cards and 6/4/3/2-column narrow-screen breakpoints. Sprite pixels render at
2x; corner painting is independent of layout spacing. Modal padding is explicit.
Used entries remain legible and the found entry retains full opacity.
Button labels move with the original pressed artwork without shifting hit areas.

WizardBook slots use asymmetric source slices 6/4/6/4 to preserve their highlights.

## Social preview

`public/og.png` is a 1200 x 630 composition of the current book theme, brand mark,
fonts and catalog icons. The original Crusenho sprites and icon artwork are
unchanged; their arrangement is adapted for this social preview. The artwork
credits and licenses above also apply to the composed image.

Run `npm run preview:social` to generate the self-contained
`dist/social-preview.html`. Render that HTML at exactly 1200 x 630 CSS pixels and
1x device scale, wait for its embedded fonts/images to load, then save a viewport
PNG as `public/og.png`. Check it at both full size and 400 x 210 before rebuilding.
The generator reads the current theme tokens and catalog mappings. Keep its
shared layout identical in both game repositories. It uses fixed sample entries,
so the social preview never reveals the daily answer. `npm run build` removes
the temporary HTML and copies only the finished PNG into the production output.

OG and Twitter image URLs include a release version to refresh previously cached
cards when the updated site is deployed.
