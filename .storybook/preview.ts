import type { Preview } from '@storybook/react';
import '../packages/tokens/src/themes/enterprise.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#fafafa',
                },
                {
                    name: 'dark',
                    value: '#171717',
                },
            ],
        },
    },
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: ['light', 'dark'],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const theme = context.globals.theme || 'light';

            // Apply theme to document
            if (typeof document !== 'undefined') {
                document.documentElement.setAttribute('data-theme', theme);
            }

            return Story();
        },
    ],
};

export default preview;
