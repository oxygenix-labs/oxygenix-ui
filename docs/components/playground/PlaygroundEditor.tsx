'use client';

import { Highlight, themes } from 'prism-react-renderer';
import styles from './PlaygroundEditor.module.css';

interface PlaygroundEditorProps {
  code: string;
}

export function PlaygroundEditor({ code }: PlaygroundEditorProps) {
  return (
    <div className={styles.editor}>
      <Highlight theme={themes.vsDark} code={code} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, margin: 0, padding: '1rem', overflow: 'auto', height: '100%' }}
          >
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
  );
}
