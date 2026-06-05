import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    icon
}) => {
    const baseStyles = 'inline-flex items-center font-bold rounded-full transition-all';

    const variants = {
        default: 'bg-sky/20 text-ink border-[2px] border-ink/20',
        success: 'bg-teal text-white border-[2px] border-ink shadow-[2px_2px_0_0_var(--ink)]',
        tech: 'tech-tag',
        playable: 'bg-meadow text-white border-[2px] border-ink shadow-[2px_2px_0_0_var(--ink)]',
        achievement: 'bg-sun text-ink border-[2px] border-ink shadow-[2px_2px_0_0_var(--ink)]',
        draft: 'bg-ink/10 text-ink/70 border-[2px] border-ink/20'
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            {icon && <span className="mr-1">{icon}</span>}
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'success', 'tech', 'playable', 'achievement', 'draft']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    icon: PropTypes.node
};

export default Badge;
