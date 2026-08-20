# Agent guide

This repository inherits the global Codex project policy. The rules below cover
only Spelldle's product, data, verification, licensing, and deployment
requirements.

## Product boundary

- Spelldle is a daily guessing game built around exactly 72 spells from the
  Dungeons & Dragons SRD 5.2.1.
- Keep the seven comparison traits authoritative: spell level, school,
  components, ritual status, casting time, range, and duration.
- Do not add homebrew, proprietary non-SRD spells, free-form spell creation,
  live-service progression, or unrelated game modes without explicit product
  approval.
- Preserve one shared worldwide puzzle that changes at midnight UTC and can be
  solved in at most six guesses.
- Player progress, statistics, streaks, and guess distribution remain local to
  the browser. This project has no backend or production database.

## Game data and shared-core contracts

- `src/spells.generated.json` contains the SRD-derived spell values;
  `src/spells.tsx` supplies the typed catalog and icon mapping.
- Every spell must have a unique seven-trait signature, a usable icon, and a
  deterministic feedback path within six guesses. Preserve the 8 x 9 archive.
- Treat the `startUtc`, `multiplier`, and `offset` values in `src/App.tsx` as a
  published continuity contract. Changing them alters the daily answer sequence
  and requires explicit product approval and release-note disclosure.
- `@sirrio/dndle-core` is pinned to an exact GitHub tag archive. Upgrade it only
  through a coordinated core release and re-run all Spelldle checks.
- Keep the storage namespace, public share URL, sibling-game link, and player
  copy stable unless the corresponding user-facing behavior intentionally
  changes.

## Verification

- Install the locked dependency set with `npm ci` when a clean installation is
  required.
- Run `npm test` to verify catalog completeness, unique signatures, full daily
  rotation, and six-guess solvability.
- Run `npm run build` for strict TypeScript checking and the production Vite
  build.
- Pull requests run both checks on Node 22 through `.github/workflows/ci.yml`.
- For shared UI or interaction changes, verify the live-equivalent production
  build on desktop and mobile. Cover archive selection, a submitted guess,
  result feedback, icon tooltips, the result dialog, statistics, and sharing.

## Deployment and release

- GitHub Pages serves production at `https://sirrio.github.io/spelldle/`.
- `.github/workflows/deploy.yml` builds, tests, and deploys every push to `main`.
  Approving a pull-request merge therefore also approves the production
  deployment and must state both actions explicitly.
- After deployment, smoke-test the live URL on desktop and mobile before
  creating the annotated version tag and matching GitHub release.
- `package.json`, the root package metadata in `package-lock.json`, the release
  branch, the final tag, and the GitHub release must use the same semantic
  version.
- Release notes describe player-visible outcomes and reuse applicable shared
  `dndle-core` wording when the core changes.

## Licensing and attribution

- Original source code is MIT licensed.
- SRD 5.2.1 material remains under CC BY 4.0. Game-icons.net artwork remains
  under CC BY 3.0 and must retain its contributor attribution.
- Keep README credits, in-game credits, bundled assets, and the actual spell and
  icon sources aligned whenever content or artwork changes.
