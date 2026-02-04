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
                    { title: 'Form System', href: '/docs/components/form', badge: 'New' },
                    { title: 'Input', href: '/docs/components/input' },
                    { title: 'Select', href: '/docs/components/select' },
                    { title: 'Checkbox', href: '/docs/components/checkbox' },
                ],
            },
            {
                title: 'Data',
                items: [
                    { title: 'DataTable', href: '/docs/components/data-table', badge: 'Popular' },
                    { title: 'List', href: '/docs/components/list' },
                    { title: 'Tree', href: '/docs/components/tree' },
                ],
            },
            {
                title: 'Layout',
                items: [
                    { title: 'AppShell', href: '/docs/components/app-shell', badge: 'New' },
                    { title: 'Container', href: '/docs/components/container' },
                    { title: 'Grid', href: '/docs/components/grid' },
                    { title: 'Stack', href: '/docs/components/stack' },
                ],
            },
            {
                title: 'Navigation',
                items: [
                    { title: 'Tabs', href: '/docs/components/tabs' },
                    { title: 'Breadcrumbs', href: '/docs/components/breadcrumbs' },
                ],
            },
            {
                title: 'Feedback',
                items: [
                    { title: 'Toast', href: '/docs/components/toast' },
                    { title: 'Alert', href: '/docs/components/alert' },
                    { title: 'Skeleton', href: '/docs/components/skeleton' },
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
