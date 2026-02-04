# Oxygenix UI

Enterprise-grade React UI library designed for data-heavy applications, admin panels, dashboards, and SaaS platforms.

## Features

- 🚀 **Enterprise-First**: Built for complex workflows, large datasets, and permission-based UIs
- 📊 **Advanced DataTable**: Virtualization, server-side pagination, bulk actions, inline editing
- 📝 **Powerful Forms**: Multi-step, conditional fields, schema-driven validation
- ♿ **Accessible**: WCAG 2.2 AA compliant by default
- 🎨 **Themeable**: CSS variables for runtime theme switching
- 📦 **Tree-Shakeable**: Import only what you need
- 🔒 **Type-Safe**: Full TypeScript support with strict mode
- ⚡ **Performant**: Optimized for 10,000+ row tables and 100+ field forms

## Installation

```bash
npm install oxygenix-ui
# or
pnpm add oxygenix-ui
# or
yarn add oxygenix-ui
```

## Quick Start

```tsx
import { DataTable, Form, Field } from 'oxygenix-ui';
import 'oxygenix-ui/styles';

// DataTable example
function UserTable() {
  return (
    <DataTable
      data={users}
      columns={[
        { id: 'name', header: 'Name', accessor: 'name' },
        { id: 'email', header: 'Email', accessor: 'email' }
      ]}
    />
  );
}

// Form example
function UserForm() {
  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

## Documentation

- [Architecture](./docs/architecture.md)
- [DataTable API](./docs/datatable-api.md)
- [Form System API](./docs/form-system-api.md)
- [Examples](./docs/examples.md)

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build

# Start Storybook
pnpm storybook
```

## Packages

This is a monorepo containing multiple packages:

- `@oxygenix-ui/core` - Core utilities and hooks
- `@oxygenix-ui/tokens` - Design tokens and themes
- `@oxygenix-ui/data` - DataTable and data components
- `@oxygenix-ui/forms` - Form system
- `@oxygenix-ui/layout` - Layout components
- `@oxygenix-ui/feedback` - Toast, errors, skeletons
- `oxygenix-ui` - Main package (re-exports all)

## License

MIT
