/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', /* custom-muted */
        input: 'var(--color-input)', /* custom-muted */
        ring: 'var(--color-ring)', /* indigo-500 */
        background: 'var(--color-background)', /* custom-dark-blue */
        foreground: 'var(--color-foreground)', /* slate-200 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* indigo-500 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* violet-500 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* custom-muted */
          foreground: 'var(--color-muted-foreground)', /* slate-400 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* amber-500 */
          foreground: 'var(--color-accent-foreground)', /* black */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* custom-surface */
          foreground: 'var(--color-popover-foreground)', /* slate-100 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* custom-surface */
          foreground: 'var(--color-card-foreground)', /* slate-100 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-500 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)', /* black */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        'text-primary': 'var(--color-text-primary)', /* slate-50 */
        'text-secondary': 'var(--color-text-secondary)', /* slate-400 */
      },
      borderRadius: {
        lg: 'var(--radius-lg)', /* 18px */
        md: 'var(--radius-md)', /* 12px */
        sm: 'var(--radius-sm)', /* 6px */
        xl: 'var(--radius-xl)', /* 24px */
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        caption: ['Source Sans 3', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '144': '36rem',
      },
      boxShadow: {
        'cinematic': '0 6px 12px rgba(99, 102, 241, 0.15)',
        'cinematic-lg': '0 12px 24px rgba(99, 102, 241, 0.15)',
        'cinematic-xl': '0 24px 48px rgba(99, 102, 241, 0.15)',
        'depth': '0 6px 12px rgba(0, 0, 0, 0.25)',
        'depth-lg': '0 12px 24px rgba(0, 0, 0, 0.25)',
        'glow-primary': '0 0 12px rgba(99, 102, 241, 0.4)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
      zIndex: {
        '1': '1',
        '50': '50',
        '100': '100',
        '110': '110',
        '120': '120',
        '130': '130',
        '200': '200',
        '300': '300',
      },
    },
  },
  plugins: [],
}