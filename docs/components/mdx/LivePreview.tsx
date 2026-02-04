'use client'

import { useState } from 'react'
import { Copy, Check, Code2, Maximize2 } from 'lucide-react'
import styles from './LivePreview.module.css'

interface LivePreviewProps {
    children: React.ReactNode
    code?: string
    title?: string
    description?: string
    showCode?: boolean
    resizable?: boolean
}

export function LivePreview({
    children,
    code,
    title,
    description,
    showCode = false,
    resizable = false,
}: LivePreviewProps) {
    const [isCodeVisible, setIsCodeVisible] = useState(showCode)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (code) {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className={styles.container}>
            {(title || description) && (
                <div className={styles.header}>
                    {title && <h4 className={styles.title}>{title}</h4>}
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            )}

            <div className={styles.preview}>
                <div className={styles.previewContent}>
                    {children}
                </div>

                <div className={styles.controls}>
                    {code && (
                        <>
                            <button
                                className={styles.controlButton}
                                onClick={() => setIsCodeVisible(!isCodeVisible)}
                                aria-label={isCodeVisible ? 'Hide code' : 'Show code'}
                                title={isCodeVisible ? 'Hide code' : 'Show code'}
                            >
                                <Code2 size={16} />
                            </button>
                            <button
                                className={styles.controlButton}
                                onClick={handleCopy}
                                aria-label="Copy code"
                                title="Copy code"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {code && isCodeVisible && (
                <div className={styles.codeBlock}>
                    <pre>
                        <code>{code}</code>
                    </pre>
                </div>
            )}
        </div>
    )
}
