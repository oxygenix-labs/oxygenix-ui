import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import '@/styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: 'Oxygenix UI - Enterprise React Components',
    description: 'Enterprise-grade React UI library for data-heavy applications, admin panels, and SaaS platforms.',
    keywords: ['React', 'UI Library', 'Enterprise', 'DataTable', 'Forms', 'TypeScript'],
    authors: [{ name: 'Oxygenix UI Team' }],
    openGraph: {
        title: 'Oxygenix UI Documentation',
        description: 'Enterprise-grade React components for data-heavy applications',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={inter.variable}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
