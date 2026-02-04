import type { Meta, StoryObj } from '@storybook/react';
import { Button, IconButton, Text, Heading, Divider } from '../packages/ui/src';

// Button Stories
const buttonMeta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default buttonMeta;
type ButtonStory = StoryObj<typeof buttonMeta>;

export const Primary: ButtonStory = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
    },
};

export const Secondary: ButtonStory = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
    },
};

export const Ghost: ButtonStory = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost',
    },
};

export const Danger: ButtonStory = {
    args: {
        children: 'Delete',
        variant: 'danger',
    },
};

export const WithLeftIcon: ButtonStory = {
    args: {
        children: 'Download',
        leftIcon: '⬇️',
        variant: 'primary',
    },
};

export const WithRightIcon: ButtonStory = {
    args: {
        children: 'Next',
        rightIcon: '→',
        variant: 'primary',
    },
};

export const Loading: ButtonStory = {
    args: {
        children: 'Loading...',
        loading: true,
        variant: 'primary',
    },
};

export const Sizes: ButtonStory = {
    render: () => (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
};

export const AllVariants: ButtonStory = {
    render: () => (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" loading>Loading</Button>
        </div>
    ),
};

// IconButton Stories
export const IconButtons: ButtonStory = {
    render: () => (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <IconButton icon="🔍" aria-label="Search" size="sm" />
            <IconButton icon="⚙️" aria-label="Settings" size="md" />
            <IconButton icon="❤️" aria-label="Like" size="lg" />
            <IconButton icon="🗑️" aria-label="Delete" disabled />
        </div>
    ),
};

// Text Stories
export const TextVariants: ButtonStory = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Text variant="body">Body text - The quick brown fox jumps over the lazy dog</Text>
            <Text variant="muted">Muted text - Secondary information or helper text</Text>
            <Text variant="caption">Caption text - Small annotations or metadata</Text>
            <Text variant="small">Small text - Compact information</Text>
            <Text variant="large">Large text - Emphasized content</Text>
            <Divider />
            <Text variant="body" weight="medium">Medium weight text</Text>
            <Text variant="body" weight="bold">Bold text for emphasis</Text>
        </div>
    ),
};

// Heading Stories
export const Headings: ButtonStory = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Heading level="h1">Heading 1 - Main Page Title</Heading>
            <Heading level="h2">Heading 2 - Section Title</Heading>
            <Heading level="h3">Heading 3 - Subsection Title</Heading>
            <Heading level="h4">Heading 4 - Component Title</Heading>
            <Heading level="h5">Heading 5 - Small Section</Heading>
            <Heading level="h6">Heading 6 - Smallest Heading</Heading>
        </div>
    ),
};

// Divider Stories
export const Dividers: ButtonStory = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <Text variant="body">Content above divider</Text>
                <Divider />
                <Text variant="body">Content below divider</Text>
            </div>

            <div>
                <Text variant="body">Dashed divider</Text>
                <Divider dashed />
                <Text variant="body">Content below</Text>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Text variant="body">Left</Text>
                <Divider orientation="vertical" style={{ height: '24px' }} />
                <Text variant="body">Middle</Text>
                <Divider orientation="vertical" style={{ height: '24px' }} />
                <Text variant="body">Right</Text>
            </div>
        </div>
    ),
};

// Complete Example
export const CompleteExample: ButtonStory = {
    render: () => (
        <div style={{ maxWidth: '600px', padding: '24px', background: 'var(--oxy-color-bg-primary)', borderRadius: '8px', border: '1px solid var(--oxy-color-border-default)' }}>
            <Heading level="h2">User Profile</Heading>
            <Text variant="muted">Manage your account settings and preferences</Text>

            <Divider />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <Heading level="h4">Personal Information</Heading>
                    <Text variant="body">John Doe</Text>
                    <Text variant="muted">john.doe@example.com</Text>
                </div>

                <Divider dashed />

                <div>
                    <Heading level="h4">Actions</Heading>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <Button variant="primary" leftIcon="✏️">Edit Profile</Button>
                        <Button variant="secondary">Change Password</Button>
                        <IconButton icon="⚙️" aria-label="Settings" />
                        <IconButton icon="🗑️" aria-label="Delete Account" />
                    </div>
                </div>

                <Divider />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant="caption">Last updated: 2 hours ago</Text>
                    <Button variant="ghost" size="sm">View History</Button>
                </div>
            </div>
        </div>
    ),
};
