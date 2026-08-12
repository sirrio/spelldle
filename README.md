# Spelldle

A daily Wordle-style guessing game for D&D SRD spells. Compare seven spell properties and uncover the entry hidden in the Arcane Archive in six guesses.

✨ **Live:** https://sirrio.github.io/spelldle/

## Features

- 📖 **72 SRD spells** in a compact 8 × 9 visual archive
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
npm install
npm run dev
```

Create the production build with:

```sh
npm run build
```

## Deploying

GitHub Actions builds the site and deploys `dist/` to **GitHub Pages** after every push to `main`.

## Credits

Spell icons by Lorc, Delapouite, and the contributors of [Game-icons.net](https://game-icons.net/), used under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## License

[MIT](LICENSE) — do whatever you want.
