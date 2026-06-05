import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
    children,
    variant = 'default',
    className = '',
    hover = true,
    onClick
}) => {
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';

    const variants = {
        default: 'slab',
        game: 'game-card',
        blog: 'blog-card',
        glass: 'glass-effect'
    };

    const hoverStyles = '';

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'game', 'blog', 'glass']),
    className: PropTypes.string,
    hover: PropTypes.bool,
    onClick: PropTypes.func
};

export default Card;
