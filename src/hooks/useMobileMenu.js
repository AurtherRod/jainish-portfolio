import { useEffect, useState, useCallback } from 'react';

export const useMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => setIsOpen(prev => !prev), []);
    const close = useCallback(() => setIsOpen(false), []);
    const open = useCallback(() => setIsOpen(true), []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                close();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, close]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return { isOpen, toggle, close, open };
};
