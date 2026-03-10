import * as formatters from '../../utils/formatters';

describe('Formatters', () => {
    describe('Date formatting', () => {
        it('should format date correctly', () => {
            const date = new Date('2024-01-15');
            const formatted = formatters.formatDate(date);
            expect(formatted).toMatch(/January|Jan/);
            expect(formatted).toContain('15');
        });
    });

    describe('Text formatting', () => {
        it('should truncate long text', () => {
            const text = 'This is a very long text that should be truncated';
            const truncated = formatters.truncateText(text, 20);
            expect(truncated.length).toBeLessThanOrEqual(23);
            expect(truncated).toContain('...');
        });

        it('should not truncate short text', () => {
            const text = 'Short';
            const truncated = formatters.truncateText(text, 20);
            expect(truncated).toBe('Short');
        });

        it('should slugify text', () => {
            expect(formatters.slugify('Hello World')).toBe('hello-world');
            expect(formatters.slugify('Test Blog Post')).toBe('test-blog-post');
        });
    });

    describe('Number formatting', () => {
        it('should format numbers with commas', () => {
            expect(formatters.formatNumber(1000)).toBe('1,000');
            expect(formatters.formatNumber(1000000)).toBe('1,000,000');
        });

        it('should handle small numbers', () => {
            expect(formatters.formatNumber(100)).toBe('100');
            expect(formatters.formatNumber(999)).toBe('999');
        });
    });
});
