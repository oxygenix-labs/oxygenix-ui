import { describe, it, expect } from 'vitest';
import { cn, generateId, clamp } from './index';

describe('core/utils', () => {
    describe('cn', () => {
        it('merges class names correctly', () => {
            expect(cn('a', 'b')).toBe('a b');
        });

        it('filters falsy values', () => {
            expect(cn('a', false && 'b', undefined, null, 'c')).toBe('a c');
        });
    });

    describe('generateId', () => {
        it('generates an ID with default prefix', () => {
            const id = generateId();
            expect(id).toMatch(/^oxy-\d+-[a-z0-9]+$/);
        });

        it('generates an ID with custom prefix', () => {
            const id = generateId('test');
            expect(id).toMatch(/^test-\d+-[a-z0-9]+$/);
        });

        it('generates unique IDs', () => {
            const id1 = generateId();
            const id2 = generateId();
            expect(id1).not.toBe(id2);
        });
    });

    describe('clamp', () => {
        it('clamps value within range', () => {
            expect(clamp(5, 0, 10)).toBe(5);
        });

        it('clamps value to min', () => {
            expect(clamp(-5, 0, 10)).toBe(0);
        });

        it('clamps value to max', () => {
            expect(clamp(15, 0, 10)).toBe(10);
        });
    });
});
