/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        corpiq: {
          blue: '#13315c',
          'blue-light': '#1a4178',
          'blue-dark': '#0c2240',
          'blue-50': '#eef3fb',
          'blue-100': '#d1e1fd',
          bordeaux: '#530f32',
          'bordeaux-light': '#6b1441',
          'bordeaux-50': '#fdf2f8',
          light: '#f8f9fb',
          accent: '#2563eb',
          'accent-light': '#3b82f6',
        }
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 0 0 1px rgba(0,0,0,0.03), 0 4px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)',
        'input-focus': '0 0 0 3px rgba(19, 49, 92, 0.08)',
        'elevated': '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'dropdown': '0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
        'nav': '0 1px 0 rgba(0,0,0,0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'slide-in-left': 'slideInLeft 0.25s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
