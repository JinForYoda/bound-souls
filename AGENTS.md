# AGENTS.md

## Project

**Bound Souls** is a browser-based 2D puzzle game built as a static frontend project.

Core stack:

- React
- TypeScript
- Vite
- Canvas API
- Zustand
- Tailwind CSS v4
- Bun
- Vitest
- Prettier

Deployment targets:

- GitHub Pages
- Vercel
- Netlify

No backend is used or planned for the MVP.

---

## Game Concept

Bound Souls is a dual-world puzzle game.

The screen shows two worlds at the same time:

- `Light World` on top
- `Shadow World` on bottom

The player controls two linked souls simultaneously.

Input rules:

- arrow keys or `WASD` attempt one move
- both souls try to move in the same direction by one tile
- if either soul cannot move, the entire move is canceled

Win condition:

- both souls must stand on their own exit gates

The game is:

- tile-based
- turn-based in logic
- smoothly animated in presentation

This is a foundation-first project.
The MVP intentionally avoids extra mechanics until the core loop is clean, readable, and stable.

---

## Design Pillars

When working on this project, preserve these pillars:

1. **Readability first**

- The player must understand the map at a glance.
- Puzzle state should be visually legible.
- Avoid decorative noise that hurts gameplay clarity.

2. **Small but polished scope**

- This is not an AAA game.
- Prefer fewer mechanics with strong execution.
- Do not bloat the project with side systems too early.

3. **Logic/render separation**

- Game rules must stay isolated from React and UI concerns.
- Rendering should not contain puzzle rules.
- React components should not own low-level gameplay logic.

4. **Data-driven content**

- Levels should remain declarative.
- Tile semantics and world object semantics should stay centralized.
- New content should be easy to add without rewriting systems.

5. **Atmosphere with restraint**

- The game should feel solemn, ancient, and mystical.
- Do not push the project into noisy fantasy excess.
- Keep a measured, elegant visual tone.

---

## Current Visual Direction

Chosen style:
**Temple Relic Pixel**

Mood:

- ancient ritual chambers
- solemn
- mystical
- restrained
- slightly ominous

World split:

- `Light World`: warm sandstone, amber, pale gold, dusty ivory
- `Shadow World`: dark slate, indigo, violet-blue, muted silver

Visual rules:

- pixel-art assets for walls, gates, and later characters
- simple, low-noise floor treatment
- no cartoon exaggeration
- no generic fantasy UI clutter
- gameplay readability beats decoration

Current rendering direction:

- empty floor tiles should stay visually simple
- walls / gates / perimeter can use sprite assets
- floor should not become a noisy texture field

---

## Architecture

Recommended mental model:

### 1. Core types

Located in:

- `src/game/core`

Contains:

- `LevelSymbol`
- directions
- shared data structures
- world/session data shapes

### 2. Level data

Located in:

- `src/game/levels`

Contains:

- raw level definitions
- parsing from symbolic layouts to world data
- level-specific content only

### 3. Pure game logic

Located in:

- `src/game/logic`

Contains:

- movement rules
- collision / passability rules
- win condition checks
- symbol behavior rules

This layer should stay pure and testable.

### 4. Rendering

Located in:

- `src/game/render`

Contains:

- canvas drawing
- symbol and player render definitions
- sprite loading / asset manifests
- palette/render config
- animation interpolation

This layer should not decide gameplay outcomes.
`DualWorldRenderer` should stay agnostic of gameplay semantics and render only from external symbol/player definitions and config.

### 5. App / UI / Store

Located in:

- `src/app`
- `src/ui`
- `src/store`

Contains:

- React shell
- controls UI
- current level UI
- loading screen / asset preload gate
- local progress persistence
- session state orchestration

### 6. Utility scripts

Located in:

- `scripts`

Contains:

- development utilities such as `level-solver`
- validation helpers that should stay outside runtime code

---

## Rules For LLM Agents

If you are an LLM working on this project, follow these rules.

### Scope discipline

- Do not introduce backend code.
- Do not add networking unless explicitly requested.
- Do not add audio, particles, enemy AI, map editor, or procedural generation unless explicitly requested.
- Do not add new mechanics unless the user asks for them.

### Respect architecture

- Keep gameplay logic out of React components.
- Keep rendering concerns out of logic modules.
- Prefer small, direct abstractions over heavy enterprise patterns.
- Do not introduce `any` when avoidable.
- Keep `LevelSymbol` as the single semantic source of truth for map content unless a new layer is clearly justified.

### Preserve the MVP shape

The current project is about:

- movement
- blocking
- exits
- levels
- polish

Do not inflate the system with speculative abstractions.

### When adding new gameplay features

Prefer this order:

1. define semantic type
2. extend data model
3. extend pure logic
4. add tests
5. update renderer
6. update UI if needed

### When touching rendering

- preserve readability
- prefer deterministic visuals over random noisy decoration
- keep floor/background quiet
- use sprites where they add clarity and identity
- prefer data-driven symbol/player render definitions over type checks inside the renderer
- keep `DualWorldRenderer` dumb: it should compose and draw, not infer tile meaning or gameplay rules

### When touching levels

- levels should remain small and readable
- challenge should come from synchronization and route planning
- avoid giant empty maps
- avoid unreadable wall noise
- when changing difficulty, preserve solvability and verify with `bun run solve:levels`

### When touching style

Preserve:

- solemn mood
- temple relic identity
- warm/cold world separation
- restrained UI language

Avoid:

- flashy neon fantasy
- generic mobile-puzzle look
- overly ornate unreadable assets
- visual clutter on floor tiles

---

## Asset Guidelines

Preferred pipeline:

- sprite assets in `public/assets/...`
- PNG for runtime assets
- source artwork may exist as SVG or larger exports, but runtime assets should be normalized

Recommended asset categories:

- `public/assets/tiles`
- `public/assets/characters`
- `public/assets/ui`

Asset expectations:

- transparent background
- consistent grid
- consistent scale
- ready for canvas `drawImage`
- no presentation/mockup framing in runtime assets

---

## Testing Expectations

Pure logic should be covered with tests.

Priority test areas:

- level parsing
- movement success/failure
- blocked moves
- win condition
- tile/object behavior semantics

Do not rely only on visual checks for gameplay correctness.

When touching level layouts or difficulty:

- run `bun run solve:levels`
- keep or intentionally adjust the minimum solution length
- prefer reducing useless state-space without making levels noisy

## Tooling

Useful local commands:

- `bun test`
- `bun run build`
- `bun run solve:levels`
- `bun run format`
- `bun run format:check`

---

## Performance / UX Expectations

- The game should feel responsive.
- Input should remain predictable.
- Browser/system shortcuts should not be broken unnecessarily.
- Canvas rendering should degrade gracefully while assets load.
- Local progress should remain stable via `localStorage`.

---

## Preferred Change Style

When making changes:

- prefer minimal, high-signal edits
- avoid giant rewrites unless necessary
- keep naming explicit and neutral
- remove dead code when a direction changes
- update tests when semantics change

If a visual or architectural direction has already been chosen, continue that direction instead of introducing a competing style.

---

## Summary

Bound Souls is a compact, atmospheric, dual-world puzzle game.

What matters most:

- clean logic
- readable puzzles
- restrained atmosphere
- data-driven content
- small, polished scope
