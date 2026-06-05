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
    const baseStyles = 'font-display inline-flex items-center justify-center transition-all';

    const variants = {
        primary: 'toon-btn',
        secondary: 'toon-btn toon-btn--sun',
        outline: 'toon-btn toon-btn--ghost',
        ghost: 'text-ink/70 hover:text-meadow-deep'
    };

    const sizes = {
        sm: 'text-sm py-2 px-4',
        md: 'text-base',
        lg: 'text-lg py-3.5 px-8'
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
