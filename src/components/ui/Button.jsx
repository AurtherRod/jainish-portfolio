import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    download,
    onClick,
    type = 'button',
    disabled = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = 'font-bold uppercase tracking-wider transition-all transform hover:scale-105 inline-flex items-center justify-center';

    const variants = {
        primary: 'bg-gradient-to-r from-game-purple to-game-pink hover:from-game-pink hover:to-game-purple text-white neon-shadow',
        secondary: 'border-3 border-game-cyan text-game-cyan hover:bg-game-cyan hover:text-game-dark pixel-corners',
        outline: 'border-3 border-game-purple text-game-purple hover:bg-game-purple hover:text-white pixel-corners',
        ghost: 'text-gray-300 hover:text-game-purple hover:bg-game-purple/10'
    };

    const sizes = {
        sm: 'px-6 py-2 text-sm rounded-lg',
        md: 'px-10 py-4 text-base rounded-xl',
        lg: 'px-12 py-5 text-lg rounded-xl'
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

    const content = (
        <>
            {Icon && <Icon className="w-5 h-5 mr-2" />}
            {children}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                download={download}
                className={classes}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {content}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    href: PropTypes.string,
    download: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    icon: PropTypes.elementType
};

export default Button;
