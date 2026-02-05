import type { MDXComponents } from 'mdx/types';

// Generate slug from heading text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

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
    ...components,
  };
}
