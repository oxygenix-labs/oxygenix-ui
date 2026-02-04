# Storybook Setup Issue & Alternative Solution

## Issue

The Oxygenix UI project is configured to use **pnpm** with workspace protocol (`workspace:*`), but npm doesn't support this protocol. This causes installation failures when trying to install Storybook with npm.

## Solutions

### Option 1: Install pnpm (Recommended)

Install pnpm globally and use it instead of npm:

```powershell
# Install pnpm globally
npm install -g pnpm

# Navigate to project
cd C:\Users\CS\Desktop\oxygenix-ui

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook
```

### Option 2: Use the Existing Docs Site

You already have a Next.js documentation site running at `docs/`. This is actually better for showcasing components than Storybook!

**Current Status:**
- ✅ Docs site is already running (`npm run dev` in docs folder)
- ✅ Accessible at http://localhost:3000 (or similar)
- ✅ Can add interactive component demos
- ✅ Better for end-user documentation

**To Add Component Demos to Docs:**

1. Create demo pages in `docs/app/docs/components/`
2. Import components directly from packages
3. Add interactive examples with code snippets

Example structure:
```
docs/app/docs/components/
├── data-table/
│   └── page.mdx          # DataTable documentation & demos
├── forms/
│   └── page.mdx          # Form documentation & demos
└── layout/
    └── page.mdx          # Layout documentation & demos
```

### Option 3: Convert to npm Workspaces

If you want to use npm instead of pnpm, you'll need to:

1. Remove `pnpm-workspace.yaml`
2. Update all `workspace:*` dependencies to `*` in package.json files
3. Change `packageManager` in root package.json
4. Run `npm install`

## Recommendation

**Use Option 1 (pnpm)** - The project is already configured for it, and it's the fastest package manager. Plus, you get:

- Faster installs
- Better disk space usage
- Strict dependency resolution
- Full workspace support

## Quick Start with pnpm

```powershell
# 1. Install pnpm
npm install -g pnpm

# 2. Install all dependencies
cd C:\Users\CS\Desktop\oxygenix-ui
pnpm install

# 3. Build all packages
pnpm build

# 4. Start Storybook
pnpm storybook
```

Storybook will open at http://localhost:6006 with all your component stories!

## What's Already Created

All Storybook files are ready:
- ✅ `.storybook/main.ts` - Configuration
- ✅ `.storybook/preview.ts` - Theme switcher
- ✅ `stories/DataTable.stories.tsx` - 6 DataTable examples
- ✅ `stories/Form.stories.tsx` - 5 Form examples  
- ✅ `stories/Layout.stories.tsx` - 4 Layout examples

Just install pnpm and run `pnpm storybook`!
