'use client';

import React from 'react';
import { CopyButton } from './CopyButton';
import styles from './LiveCodeBlock.module.css';

interface LiveCodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function LiveCodeBlock({ children, className }: LiveCodeBlockProps) {
  return <div className={`${styles.container} ${className || ''}`}>{children}</div>;
}

interface LivePreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function LivePreview({ children, className }: LivePreviewProps) {
  return <div className={`${styles.preview} ${className || ''}`}>{children}</div>;
}

interface LiveSourceProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

import { Highlight, themes } from 'prism-react-renderer';

export function LiveSource({ code, language = 'tsx', filename, className }: LiveSourceProps) {
  return (
    <div className={`${styles.source} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.windowControls}>
          <span className={styles.redDot} />
          <span className={styles.yellowDot} />
          <span className={styles.greenDot} />
        </div>
        {filename && <span className={styles.filename}>{filename}</span>}
      </div>
      <div className={styles.copyButtonWrapper}>
        <CopyButton text={code} className={styles.copyButton} />
      </div>
      <div className={styles.codeScroll}>
        <Highlight theme={themes.vsDark} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={{ ...style, background: 'transparent' }} className={className}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
