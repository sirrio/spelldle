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

This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).

Spell icons by Lorc, Delapouite, and the contributors of [Game-icons.net](https://game-icons.net/), used under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## License

The original source code is available under the [MIT License](LICENSE). SRD material and icons remain subject to their respective licenses above.
