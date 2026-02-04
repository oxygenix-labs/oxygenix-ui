export interface NavItem {
    title: string
    href?: string
    items?: NavItem[]
    badge?: string
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
            {
                title: 'UI',
                items: [
                    { title: 'Button', href: '/docs/components/button', badge: 'New' },
                    { title: 'IconButton', href: '/docs/components/icon-button', badge: 'New' },
                    { title: 'Text', href: '/docs/components/text', badge: 'New' },
                    { title: 'Heading', href: '/docs/components/heading', badge: 'New' },
                    { title: 'Divider', href: '/docs/components/divider', badge: 'New' },
                ],
            },
            {
                title: 'Forms',
                items: [
                    { title: 'Form System', href: '/docs/components/form' },
                    { title: 'Input', href: '/docs/components/input', badge: 'New' },
                    { title: 'Textarea', href: '/docs/components/textarea', badge: 'New' },
                    { title: 'Select', href: '/docs/components/select', badge: 'New' },
                    { title: 'Checkbox', href: '/docs/components/checkbox', badge: 'New' },
                    { title: 'RadioGroup', href: '/docs/components/radio-group', badge: 'New' },
                    { title: 'FormField', href: '/docs/components/form-field', badge: 'New' },
                    { title: 'FormGroup', href: '/docs/components/form-group', badge: 'New' },
                ],
            },
            {
                title: 'Data',
                items: [
                    { title: 'DataTable', href: '/docs/components/data-table', badge: 'Popular' },
                    { title: 'TableToolbar', href: '/docs/components/table-toolbar', badge: 'New' },
                    { title: 'EmptyState', href: '/docs/components/empty-state', badge: 'New' },
                    { title: 'Skeleton', href: '/docs/components/skeleton', badge: 'New' },
                ],
            },
            {
                title: 'Layout',
                items: [
                    { title: 'AppShell', href: '/docs/components/app-shell', badge: 'New' },
                    { title: 'Sidebar', href: '/docs/components/sidebar', badge: 'New' },
                    { title: 'PageHeader', href: '/docs/components/page-header', badge: 'New' },
                    { title: 'Stack', href: '/docs/components/stack', badge: 'New' },
                    { title: 'Grid', href: '/docs/components/grid', badge: 'New' },
                ],
            },
            {
                title: 'Navigation',
                items: [
                    { title: 'Tabs', href: '/docs/components/tabs', badge: 'New' },
                    { title: 'Breadcrumbs', href: '/docs/components/breadcrumbs', badge: 'New' },
                    { title: 'Pagination', href: '/docs/components/pagination', badge: 'New' },
                ],
            },
            {
                title: 'Feedback',
                items: [
                    { title: 'Alert', href: '/docs/components/alert', badge: 'New' },
                    { title: 'Toast', href: '/docs/components/toast', badge: 'New' },
                    { title: 'Progress', href: '/docs/components/progress', badge: 'New' },
                    { title: 'Badge', href: '/docs/components/badge', badge: 'New' },
                ],
            },
            {
                title: 'Enterprise',
                items: [
                    { title: 'Permission Gate', href: '/docs/components/permission-gate' },
                    { title: 'Audit Log', href: '/docs/components/audit-log' },
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
]
