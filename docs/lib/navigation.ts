export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
  badge?: string;
}

export const navigation: NavItem[] = [
  {
    title: 'Introduction',
    href: '/docs',
  },
  {
    title: 'Getting Started',
    items: [
      { title: 'Installation', href: '/docs/getting-started/installation' },
      { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
      { title: 'Configuration', href: '/docs/getting-started/configuration' },
    ],
  },
  {
    title: 'Design Principles',
    href: '/docs/design-principles',
  },
  {
    title: 'Components',
    items: [
      { title: 'Overview', href: '/components' },
      {
        title: 'UI',
        items: [
          { title: 'Button', href: '/components/button', badge: 'New' },
          { title: 'IconButton', href: '/components/icon-button', badge: 'New' },
          { title: 'Text', href: '/components/text', badge: 'New' },
          { title: 'Heading', href: '/components/heading', badge: 'New' },
          { title: 'Divider', href: '/components/divider', badge: 'New' },
        ],
      },
      {
        title: 'Forms',
        items: [
          { title: 'Form System', href: '/components/form' },
          { title: 'Input', href: '/components/input', badge: 'New' },
          { title: 'Textarea', href: '/components/textarea', badge: 'New' },
          { title: 'Select', href: '/components/select', badge: 'New' },
          { title: 'Checkbox', href: '/components/checkbox', badge: 'New' },
          { title: 'RadioGroup', href: '/components/radio-group', badge: 'New' },
          { title: 'FormField', href: '/components/form-field', badge: 'New' },
          { title: 'FormGroup', href: '/components/form-group', badge: 'New' },
        ],
      },
      {
        title: 'Data',
        items: [
          { title: 'DataTable', href: '/components/data-table', badge: 'Popular' },
          { title: 'TableToolbar', href: '/components/table-toolbar', badge: 'New' },
          { title: 'EmptyState', href: '/components/empty-state', badge: 'New' },
          { title: 'Skeleton', href: '/components/skeleton', badge: 'New' },
        ],
      },
      {
        title: 'Layout',
        items: [
          { title: 'AppShell', href: '/components/app-shell', badge: 'New' },
          { title: 'Sidebar', href: '/components/sidebar', badge: 'New' },
          { title: 'PageHeader', href: '/components/page-header', badge: 'New' },
          { title: 'Stack', href: '/components/stack', badge: 'New' },
          { title: 'Grid', href: '/components/grid', badge: 'New' },
        ],
      },
      {
        title: 'Navigation',
        items: [
          { title: 'Tabs', href: '/components/tabs', badge: 'New' },
          { title: 'Breadcrumbs', href: '/components/breadcrumbs', badge: 'New' },
          { title: 'Pagination', href: '/components/pagination', badge: 'New' },
        ],
      },
      {
        title: 'Feedback',
        items: [
          { title: 'Alert', href: '/components/alert', badge: 'New' },
          { title: 'Toast', href: '/components/toast', badge: 'New' },
          { title: 'Progress', href: '/components/progress', badge: 'New' },
          { title: 'Badge', href: '/components/badge', badge: 'New' },
        ],
      },
      {
        title: 'Enterprise',
        items: [
          { title: 'Permission Gate', href: '/components/permission-gate' },
          { title: 'Audit Log', href: '/components/audit-log' },
        ],
      },
    ],
  },
  {
    title: 'Theming',
    href: '/docs/theming',
  },
  {
    title: 'Accessibility',
    href: '/docs/accessibility',
  },
  {
    title: 'Performance',
    href: '/docs/performance',
  },
  {
    title: 'Advanced Guides',
    items: [
      { title: 'Complex Forms', href: '/docs/advanced/complex-forms' },
      { title: 'Large Datasets', href: '/docs/advanced/large-datasets' },
      { title: 'Server-Side Rendering', href: '/docs/advanced/ssr' },
    ],
  },
  {
    title: 'Contributing',
    href: '/docs/contributing',
  },
  {
    title: 'Support Us ❤️',
    href: '/docs/support',
  },
];
