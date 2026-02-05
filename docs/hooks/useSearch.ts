import { useState, useEffect, useCallback } from 'react';
import { create, insert, search } from '@orama/orama';
import { navigation, NavItem } from '@/lib/navigation';

type DocSearchItem = {
  title: string;
  href: string;
  section: string;
};

// Flatten navigation for indexing
function flattenNavigation(items: NavItem[], section: string = ''): DocSearchItem[] {
  return items.reduce((acc, item) => {
    const currentSection = item.items ? item.title : section;

    if (item.href) {
      acc.push({
        title: item.title,
        href: item.href,
        section: currentSection || 'General',
      });
    }

    if (item.items) {
      acc.push(...flattenNavigation(item.items, currentSection));
    }

    return acc;
  }, [] as DocSearchItem[]);
}

export function useSearch() {
  const [db, setDb] = useState<any>(null);
  const [results, setResults] = useState<DocSearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initSearch() {
      const searchDb = await create({
        schema: {
          title: 'string',
          href: 'string',
          section: 'string',
        },
      });

      const docs = flattenNavigation(navigation);

      for (const doc of docs) {
        await insert(searchDb, doc);
      }

      setDb(searchDb);
      setLoading(false);
    }

    initSearch();
  }, []);

  const performSearch = useCallback(
    async (query: string) => {
      if (!db || !query) {
        setResults([]);
        return;
      }

      const searchResult = await search(db, {
        term: query,
        properties: ['title', 'section'],
        threshold: 0.2, // Fuzzy search
        limit: 10,
      });

      // Map internal Orama results back to our DocSearchItem type
      const mappedResults = searchResult.hits.map((hit) => ({
        title: hit.document.title as string,
        href: hit.document.href as string,
        section: hit.document.section as string,
      }));

      setResults(mappedResults);
    },
    [db]
  );

  return { performSearch, results, loading };
}
