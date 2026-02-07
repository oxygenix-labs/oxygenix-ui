import type { MDXComponents } from 'mdx/types';

// Generate slug from heading text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

import { CodeTabs } from '@/components/mdx/CodeTabs';
import { LiveCodeBlock, LivePreview, LiveSource } from '@/components/mdx/LiveCodeBlock';
import {
  Button,
  Flex,
  ArrowRightIcon,
  Input,
  IconButton,
  Text,
  Heading,
  Divider,
  FormField,
  FormGroup,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  DataTable,
  TableToolbar,
  EmptyState,
  Skeleton,
} from '@oxygenix-ui/ui';
import { AppShell } from '@oxygenix-ui/layout';
import {
  Search,
  Plus,
  Trash,
  Edit,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

// Custom heading components with IDs
const createHeading = (level: number) => {
  const HeadingComponent = ({ children, ...props }: any) => {
    const text = typeof children === 'string' ? children : '';
    const id = slugify(text);
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
      <Tag id={id} {...props}>
        {children}
      </Tag>
    );
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    table: (props: any) => (
      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table {...props} />
      </div>
    ),
    CodeTabs,
    LiveCodeBlock,
    LivePreview,
    LiveSource,
    Button,
    IconButton,
    Flex,
    Input,
    ArrowRightIcon,
    Search,
    Plus,
    Trash,
    Edit,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Text,
    Heading,
    Divider,
    FormField,
    FormGroup,
    Textarea,
    Select,
    Checkbox,
    RadioGroup,
    DataTable,
    TableToolbar,
    EmptyState,
    Skeleton,
    AppShell,
    ...components,
  };
}
