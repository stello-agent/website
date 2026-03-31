# Stello Website

This project now runs on Astro, while keeping the existing React components as the primary UI implementation.

## Scripts

- `pnpm dev`: start Astro dev server
- `pnpm build`: build production output with Astro
- `pnpm preview`: preview the built site
- `pnpm lint`: run Biome checks
- `pnpm lint:fix`: run Biome checks with safe fixes
- `pnpm format`: format code with Biome
- `pnpm test`: run Vitest

## Stack

- Astro + `@astrojs/react`
- React 19 components mounted via Astro islands
- Vitest + Testing Library for component tests
- Biome for linting and formatting
