import createMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['@oxygenix-ui/ui', '@oxygenix-ui/core', '@oxygenix-ui/tokens'],
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@oxygenix-ui/tokens': new URL('../packages/tokens', import.meta.url).pathname,
            '@oxygenix-ui/ui': new URL('../packages/ui', import.meta.url).pathname,
        }
        return config
    },
}

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap', test: ['h2', 'h3', 'h4', 'h5', 'h6'] }],
        ],
    },
})

export default withMDX(nextConfig)
