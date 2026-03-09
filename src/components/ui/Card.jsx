import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
    children,
    variant = 'default',
    className = '',
    hover = true,
    onClick
}) => {
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-400 backdrop-filter backdrop-blur-15';

    const variants = {
        default: 'bg-gradient-to-br from-game-dark/70 to-game-darker/80 border-2 border-game-purple/15',
        game: 'game-card',
        blog: 'blog-card',
        glass: 'glass-effect'
    };

    const hoverStyles = hover ? 'hover:transform hover:-translate-y-2 hover:scale-102 hover:border-game-purple/50 hover:shadow-game-glow' : '';

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
