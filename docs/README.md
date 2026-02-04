# Oxygenix UI Documentation

Enterprise-grade documentation site for Oxygenix UI - built with Next.js 14, TypeScript, and MDX.

## Features

- 📚 **MDX-powered** - Write documentation in Markdown with React components
- 🎨 **Beautiful Design** - Professional, calm design inspired by Stripe and Vercel
- 🌓 **Dark Mode** - Smooth theme switching with system preference detection
- 🔍 **Search** - Fast, offline-first search (coming soon)
- 📱 **Responsive** - Mobile-friendly with collapsible navigation
- ♿ **Accessible** - WCAG 2.2 AA compliant
- ⚡ **Fast** - Optimized for performance

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+ (or npm/yarn)

### Installation

```bash
# Install dependencies
cd docs
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The site will be available at `http://localhost:3000`.

## Project Structure

```
docs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── docs/              # Documentation pages
│       ├── layout.tsx     # Docs layout (with sidebar)
│       ├── page.mdx       # Docs home
│       └── components/    # Component docs
├── components/
│   ├── layout/            # Header, Sidebar, Footer
│   ├── mdx/               # LivePreview, CodeBlock
│   └── ui/                # Badge, Tabs, etc.
├── lib/
│   └── navigation.ts      # Navigation structure
└── styles/
    └── globals.css        # Design system
```

## Writing Documentation

### Creating a New Page

1. Create an MDX file in `app/docs/[category]/[page]/page.mdx`
2. Add the route to `lib/navigation.ts`
3. Write content using MDX

### Using Components

```mdx
import { LivePreview } from '@/components/mdx/LivePreview'
import { Badge } from '@/components/ui/Badge'

# Component Name

<Badge variant="stable">Stable</Badge>

Description of the component.

<LivePreview code={`...`}>
  <YourComponent />
</LivePreview>
```

## Design System

The design system is defined in `styles/globals.css` using CSS variables:

- **Colors**: Neutral palette with professional blue accent
- **Typography**: Inter for text, JetBrains Mono for code
- **Spacing**: 8px grid system
- **Dark Mode**: Automatic with manual toggle

## Deployment

Deploy to Vercel:

```bash
vercel
```

Or build and deploy anywhere:

```bash
pnpm build
# Deploy the .next folder
```

## License

MIT
