import * as validators from '../../utils/validators';

describe('Validators', () => {
    describe('Email validation', () => {
        it('should validate correct email', () => {
            expect(validators.isValidEmail('user@example.com')).toBe(true);
        });

        it('should reject invalid email', () => {
            expect(validators.isValidEmail('invalid-email')).toBe(false);
            expect(validators.isValidEmail('user@')).toBe(false);
            expect(validators.isValidEmail('@example.com')).toBe(false);
        });
    });

    describe('URL validation', () => {
        it('should validate correct URL', () => {
            expect(validators.isValidUrl('https://example.com')).toBe(true);
            expect(validators.isValidUrl('http://example.com')).toBe(true);
        });

        it('should reject invalid URL', () => {
            expect(validators.isValidUrl('not a url')).toBe(false);
        });
    });

    describe('Empty value check', () => {
        it('should detect empty string', () => {
            expect(validators.isEmpty('')).toBe(true);
            expect(validators.isEmpty('   ')).toBe(true);
        });

        it('should detect empty array', () => {
            expect(validators.isEmpty([])).toBe(true);
        });

        it('should detect empty object', () => {
            expect(validators.isEmpty({})).toBe(true);
        });

        it('should detect null/undefined', () => {
            expect(validators.isEmpty(null)).toBe(true);
            expect(validators.isEmpty(undefined)).toBe(true);
        });

        it('should return false for non-empty values', () => {
            expect(validators.isEmpty('hello')).toBe(false);
            expect(validators.isEmpty([1, 2])).toBe(false);
            expect(validators.isEmpty({ key: 'value' })).toBe(false);
        });
    });
});
