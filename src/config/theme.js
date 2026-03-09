// Gaming-themed color palette
export const colors = {
    gameDark: '#0a0e27',
    gameDarker: '#050814',
    gamePurple: '#8b5cf6',
    gamePink: '#ec4899',
    gameCyan: '#06b6d4',
    gameYellow: '#fbbf24',
};

// Animation configurations
export const animations = {
    delays: {
        none: '0ms',
        short: '100ms',
        medium: '200ms',
        long: '400ms',
        xlong: '600ms',
    },
    durations: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
    },
    easings: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
};

// Spacing scale
export const spacing = {
    section: {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-24',
        lg: 'py-20 md:py-32',
    },
    container: 'container mx-auto px-6',
};

// Typography scale
export const typography = {
    heading: {
        xl: 'text-7xl md:text-9xl font-black',
        lg: 'text-5xl md:text-7xl font-black',
        md: 'text-4xl md:text-5xl font-bold',
        sm: 'text-3xl md:text-4xl font-bold',
    },
    body: {
        lg: 'text-xl md:text-2xl',
        md: 'text-lg md:text-xl',
        sm: 'text-base md:text-lg',
    },
};

// Breakpoints (matching Tailwind defaults)
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

// Z-index scale
export const zIndex = {
    background: 0,
    content: 10,
    header: 50,
    modal: 100,
    tooltip: 200,
};

export default {
    colors,
    animations,
    spacing,
    typography,
    breakpoints,
    zIndex,
};
