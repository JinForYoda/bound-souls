# Bound Souls

Bound Souls is a small browser puzzle game about guiding two tethered souls through mirrored but unequal worlds. One move affects both worlds at once, and a step only succeeds when both souls can advance together.

## Highlights

- Dual-world puzzle gameplay rendered on a single canvas
- Turn-based tile movement with smooth step animation
- Data-driven levels built from `LevelSymbol` layouts
- Five handcrafted chambers with increasing minimum solution length
- Local progress persistence with `localStorage`
- Pure game logic separated from React components
- Canvas renderer isolated from game rules
- Asset preload gate with a dedicated loading screen
- Unit tests for level parsing, movement, symbol semantics, and win conditions

## Stack

- Bun
- React 19
- React Compiler
- TypeScript
- Vite
- Canvas API
- Zustand
- Tailwind CSS 4
- Vitest
- Prettier

## Gameplay

- `Light World` is shown on the top half of the board
- `Shadow World` is shown on the bottom half
- `WASD` or arrow keys move both souls in the same direction
- If either world blocks the move, the step is canceled
- A level is solved only when both souls reach their exit gates

## Run Locally

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
bun run preview
```

## Tests

```bash
bun run test
```

## Utilities

```bash
bun run solve:levels
bun run solve:levels sanctum-knot
bun run format
bun run format:check
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
- `scripts/level-solver.ts` validates solvability and reports minimum solutions

Levels use `LevelSymbol` as the main semantic source of truth, and `DualWorldRenderer` stays agnostic by drawing from external symbol/player render definitions.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
