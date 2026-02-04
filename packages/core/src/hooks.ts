import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook for managing controlled vs uncontrolled component state
 *
 * This hook allows components to work in both controlled and uncontrolled modes.
 * If a controlled value is provided, it uses that. Otherwise, it manages internal state.
 *
 * @example
 * ```tsx
 * function Input({ value, onChange, defaultValue = '' }) {
 *   const [inputValue, setInputValue] = useControllable(value, defaultValue, onChange);
 *
 *   return (
 *     <input
 *       value={inputValue}
 *       onChange={(e) => setInputValue(e.target.value)}
 *     />
 *   );
 * }
 * ```
 */
export function useControllable<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T | ((prev: T) => T)) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = controlledValue !== undefined;

  // Use controlled value if provided, otherwise use internal state
  const value = isControlled ? controlledValue : internalValue;

  // Callback to update value
  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue;

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      // Call onChange callback if provided
      onChange?.(resolvedValue);
    },
    [isControlled, onChange, value]
  );

  return [value, setValue];
}

/**
 * Hook for composing multiple refs into a single ref callback
 *
 * Useful when you need to forward a ref while also maintaining an internal ref.
 *
 * @example
 * ```tsx
 * const MyComponent = forwardRef((props, ref) => {
 *   const internalRef = useRef();
 *   const composedRef = useComposedRefs(ref, internalRef);
 *
 *   return <div ref={composedRef}>...</div>;
 * });
 * ```
 */
export function useComposedRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return useCallback(
    (element: T | null) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T | null>).current = element;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}

/**
 * Hook for debouncing a value
 *
 * Returns a debounced version of the value that only updates after the specified delay.
 *
 * @example
 * ```tsx
 * function SearchInput() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
 *
 *   useEffect(() => {
 *     // This only runs 300ms after the user stops typing
 *     performSearch(debouncedSearchTerm);
 *   }, [debouncedSearchTerm]);
 *
 *   return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
 * }
 * ```
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for debouncing a callback function
 *
 * Returns a debounced version of the callback that only executes after the specified delay.
 *
 * @example
 * ```tsx
 * function SearchInput() {
 *   const debouncedSearch = useDebouncedCallback((term: string) => {
 *     performSearch(term);
 *   }, 300);
 *
 *   return <input onChange={(e) => debouncedSearch(e.target.value)} />;
 * }
 * ```
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Hook for throttling a callback function
 *
 * Returns a throttled version of the callback that only executes at most once per delay period.
 *
 * @example
 * ```tsx
 * function ScrollHandler() {
 *   const handleScroll = useThrottledCallback(() => {
 *     console.log('Scrolled!');
 *   }, 100);
 *
 *   return <div onScroll={handleScroll}>...</div>;
 * }
 * ```
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastRan = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
          () => {
            callback(...args);
            lastRan.current = Date.now();
          },
          delay - (now - lastRan.current)
        );
      }
    },
    [callback, delay]
  );
}

/**
 * Hook for managing previous value
 *
 * Returns the previous value of a state or prop.
 *
 * @example
 * ```tsx
 * function Counter({ count }: { count: number }) {
 *   const previousCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current: {count}</p>
 *       <p>Previous: {previousCount}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Hook for detecting clicks outside an element
 *
 * Calls the handler when a click occurs outside the referenced element.
 *
 * @example
 * ```tsx
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useClickOutside(() => setIsOpen(false));
 *
 *   return (
 *     <div ref={ref}>
 *       {isOpen && <div>Dropdown content</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}

/**
 * Hook for managing focus trap
 *
 * Traps focus within the referenced element (useful for modals, dialogs).
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const ref = useFocusTrap();
 *
 *   return (
 *     <div ref={ref}>
 *       <input />
 *       <button>Close</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    // Focus first element on mount
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ref;
}

/**
 * Hook for managing media query
 *
 * Returns whether the media query matches.
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 *
 *   return isMobile ? <MobileView /> : <DesktopView />;
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Legacy browsers
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}
