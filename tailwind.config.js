/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-dark': '#ffe3d4',
        'game-darker': '#ffd0bf',
        'game-purple': '#ff6f91',
        'game-pink': '#ff6f91',
        'game-cyan': '#2bb6a3',
        'game-yellow': '#ffc24b',
        'neon': '#ff6f91',
        'neon-dim': '#e64c73',
        'neon-bright': '#ff89a4',
        'sky': '#b89cff',
        'sky-deep': '#8e6cf0',
        'meadow': '#ff6f91',
        'meadow-deep': '#e64c73',
        'coral': '#ff9a4d',
        'sun': '#ffc24b',
        'teal': '#2bb6a3',
        'paper': '#ffe3d4',
        'cream': '#fff6ee',
        'ink': '#3b2b3a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 15px #39ff14' },
          '100%': { boxShadow: '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14' },
          '50%': { opacity: '0.8', textShadow: '0 0 5px #39ff14, 0 0 10px #39ff14' },
        },
      },
      backgroundImage: {
        'game-gradient': 'linear-gradient(135deg, #39ff14 0%, #2db80e 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #39ff14 0%, #7fff00 100%)',
        'neon-gradient': 'linear-gradient(135deg, #39ff14 0%, #00ff41 100%)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
