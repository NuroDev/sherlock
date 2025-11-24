# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sherlock is a Cloudflare Workers application that searches for usernames across social media platforms. It uses Cloudflare Containers to run the Python-based sherlock-project tool, with a Hono web frontend that provides both HTML and JSON API responses.

## Development Commands

### Running the application
```bash
bun run dev           # Start local development server with wrangler
```

### Code quality
```bash
bun run lint          # Lint code with Biome (auto-fixes)
bun run format        # Format code with Biome
bun run check         # Check code without auto-fixing
```

### Deployment
```bash
bun run deploy        # Deploy to Cloudflare Workers
bun run cf-typegen    # Generate TypeScript types from wrangler.jsonc
```

## Architecture

### Two-tier architecture

1. **Frontend (Cloudflare Worker - TypeScript/Hono)**
   - Entry point: `src/index.tsx`
   - Receives username search requests
   - Returns HTML views or JSON responses based on Accept header
   - Implements KV caching (1 hour TTL) to avoid redundant container calls

2. **Backend (Cloudflare Container - Python/Flask)**
   - Defined in: `container/Dockerfile` and `container/server.py`
   - Runs the sherlock-project CLI tool
   - Exposes a Flask API at `/check` endpoint
   - Parses sherlock CLI output and returns structured JSON

### Key components

**Container integration** (`src/utils.ts:getUser`):
- Uses `@cloudflare/containers` to spawn per-username Sherlock containers
- Container lifecycle: `getContainer()` → `startAndWaitForPorts()` → `fetch()`
- Containers sleep after 30 minutes of inactivity (configured in `Sherlock` class)

**Caching strategy** (`src/utils.ts:14-57`):
- Cache key: URL path (e.g., `/username`)
- Cached results validated against `ResultSchema` before use
- Invalid cache entries trigger fresh container requests
- Background cache writes via `executionCtx.waitUntil()`

**Request flow**:
1. User hits `/:username` route
2. Check KV cache (`SHERLOCK_CACHE`)
3. If miss/invalid: spawn container, POST to `/check`, validate response
4. Return HTML or JSON based on Accept header

### TypeScript configuration

- Import alias: `~/*` maps to `./src/*`
- JSX runtime: Hono (`jsxImportSource: "hono/jsx"`)
- Module system: ES2022 with Bundler resolution

### Cloudflare resources

Defined in `wrangler.jsonc`:
- **Durable Object**: `Sherlock` container class (max 5 instances)
- **KV Namespace**: `SHERLOCK_CACHE` for username lookup results
- **Container settings**: 8080 port, internet enabled, 30m sleep timeout

### Code style (Biome)

- Indentation: tabs (width 4)
- Quotes: single quotes for JS/TS, single quotes for JSX
- Semicolons: always
- Trailing commas: always
- Line width: 90 characters
