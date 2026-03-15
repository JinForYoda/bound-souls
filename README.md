# Bound Souls

Bound Souls is a small browser puzzle game about guiding two tethered souls through mirrored but unequal worlds. One move affects both worlds at once, and a step only succeeds when both souls can advance together.

## Highlights

- Dual-world puzzle gameplay rendered on a single canvas
- Turn-based tile movement with smooth step animation
- Data-driven levels
- Local progress persistence with `localStorage`
- Pure game logic separated from React components
- Canvas renderer isolated from game rules
- Unit tests for level parsing, movement, tile semantics, and world objects

## Stack

- React
- TypeScript
- Vite
- Canvas API
- Zustand
- Tailwind CSS
- Vitest

## Gameplay

- `Light World` is shown on the top half of the board
- `Shadow World` is shown on the bottom half
- `WASD` or arrow keys move both souls in the same direction
- If either world blocks the move, the step is canceled
- A level is solved only when both souls reach their exit gates

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

## Project Structure

```text
src/
├── app/
├── game/
│   ├── core/
│   ├── levels/
│   ├── logic/
│   └── render/
├── store/
└── ui/
```

## Architecture Notes

- `src/game/logic` contains the pure gameplay rules
- `src/game/render` contains the canvas rendering pipeline
- `src/game/levels` contains declarative level data and parsing
- `src/store` manages session and progression state
- `src/ui` contains the React shell around the game canvas

Tiles and world objects are modeled separately so terrain and interactive entities can evolve independently.

## Deployment

The project is ready for static hosting:

- GitHub Pages
- Vercel
- Netlify

GitHub Pages deployment is configured through GitHub Actions.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
