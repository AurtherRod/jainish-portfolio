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
        default: 'bg-gradient-to-r from-game-purple/20 to-game-pink/20 text-game-purple border border-game-purple/30',
        success: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/40',
        tech: 'tech-tag text-game-cyan',
        playable: 'bg-gradient-to-r from-game-purple to-game-pink text-white shadow-lg animate-pulse'
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
    variant: PropTypes.oneOf(['default', 'success', 'tech', 'playable']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    icon: PropTypes.node
};

export default Badge;
