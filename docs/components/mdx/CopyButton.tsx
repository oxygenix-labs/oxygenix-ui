'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import styles from './CopyButton.module.css'

interface CopyButtonProps {
    code: string
    className?: string
}

export function CopyButton({ code, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            className={`${styles.button} ${copied ? styles.copied : ''} ${className || ''}`}
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy code'}
            title={copied ? 'Copied!' : 'Copy code'}
        >
            {copied ? (
                <>
                    <Check size={14} />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Copy size={14} />
                    <span>Copy</span>
                </>
            )}
        </button>
    )
}
