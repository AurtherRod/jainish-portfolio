/**
 * Conditionally join classNames together
 * @param  {...any} classes - Class names or objects
 * @returns {string} Joined class names
 */
export const classNames = (...classes) => {
    return classes
        .flat()
        .filter(Boolean)
        .map(cls => {
            if (typeof cls === 'string') return cls;
            if (typeof cls === 'object') {
                return Object.entries(cls)
                    .filter(([, value]) => Boolean(value))
                    .map(([key]) => key)
                    .join(' ');
            }
            return '';
        })
        .join(' ')
        .trim();
};

/**
 * Create variant-based className
 * @param {string} base - Base class name
 * @param {object} variants - Variant options
 * @param {string} selected - Selected variant
 * @returns {string} Combined class name
 */
export const variantClass = (base, variants, selected) => {
    return classNames(base, variants[selected] || variants.default);
};
