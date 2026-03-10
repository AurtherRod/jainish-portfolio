describe('Backend Unit Tests', () => {
    it('should pass basic test', () => {
        expect(true).toBe(true);
    });

    it('should add numbers', () => {
        expect(1 + 1).toBe(2);
    });

    it('should work with strings', () => {
        expect('hello').toBe('hello');
    });

    it('should work with arrays', () => {
        const arr = [1, 2, 3];
        expect(arr.length).toBe(3);
        expect(arr[0]).toBe(1);
    });

    it('should work with objects', () => {
        const obj = { name: 'test', value: 42 };
        expect(obj.name).toBe('test');
        expect(obj.value).toBe(42);
    });

    it('should handle async operations', async () => {
        const promise = Promise.resolve('success');
        const result = await promise;
        expect(result).toBe('success');
    });

    it('should handle errors', () => {
        const throwError = () => {
            throw new Error('Test error');
        };
        expect(throwError).toThrow('Test error');
    });
});
