'use client';

import { useState } from 'react';
import { Button, Badge, Input, Checkbox } from '@oxygenix-ui/ui';
import { PlaygroundEditor } from '@/components/playground/PlaygroundEditor';
import styles from './page.module.css';
import { MousePointer2, Tag, FormInput, CheckSquare, RotateCcw } from 'lucide-react';

// Define the component configuration
interface ComponentConfig {
  name: string;
  icon: React.ElementType;
  code: string;
  render: () => React.ReactNode;
}

const components: ComponentConfig[] = [
  {
    name: 'Button',
    icon: MousePointer2,
    code: `<Button variant="primary" onClick={() => alert('Clicked!')}>\n  Click Me\n</Button>`,
    render: () => (
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    ),
  },
  {
    name: 'Badge',
    icon: Tag,
    code: `<Badge variant="primary">New Feature</Badge>`,
    render: () => <Badge variant="primary">New Feature</Badge>,
  },
  {
    name: 'Input',
    icon: FormInput,
    code: `<Input placeholder="Enter your email..." />`,
    render: () => <Input placeholder="Enter your email..." />,
  },
  {
    name: 'Checkbox',
    icon: CheckSquare,
    code: `<Checkbox id="terms" label="Accept terms" />`,
    render: () => <Checkbox id="terms" label="Accept terms" />,
  },
];

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentConfig>(components[0]);
  const [key, setKey] = useState(0); // To force re-render on reset

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      {/* Left Panel: Selector */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Components</h2>
        </div>
        <ul className={styles.componentList}>
          {components.map((c) => (
            <li key={c.name}>
              <button
                className={`${styles.componentButton} ${selectedComponent.name === c.name ? styles.active : ''}`}
                onClick={() => setSelectedComponent(c)}
              >
                <c.icon size={18} className={styles.componentIcon} />
                <span>{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Middle Panel: Preview */}
      <section className={styles.previewPanel}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.toolbarTitle}>Preview</span>
          </div>
          <div className={styles.toolbarRight}>
            <Button size="sm" variant="ghost" onClick={handleReset} className={styles.resetButton}>
              <RotateCcw size={14} style={{ marginRight: '6px' }} /> Reset
            </Button>
          </div>
        </div>
        <div className={styles.previewCanvas} key={key}>
          <div className={styles.canvasContent}>{selectedComponent.render()}</div>
        </div>
      </section>

      {/* Right Panel: Editor */}
      <section className={styles.editorPanel}>
        <div className={styles.toolbar}>
          <span className={styles.toolbarTitle}>Code</span>
        </div>
        <div className={styles.editorContainer}>
          <PlaygroundEditor code={selectedComponent.code} />
        </div>
      </section>
    </div>
  );
}
