/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'risd_blue': {
          DEFAULT: '#3758ED',
          50: '#e8eaff',
          100: '#d1d5ff',
          200: '#a3abff',
          300: '#7581ff',
          400: '#4757ff',
          500: '#3758ed',
          600: '#2c46ba',
          700: '#213487',
          800: '#162254',
          900: '#0b1021'
        },
        'selective_yellow': {
          DEFAULT: '#FDB212',
          50: '#fff7e6',
          100: '#ffefcc',
          200: '#ffdf99',
          300: '#ffcf66',
          400: '#ffbf33',
          500: '#fdb212',
          600: '#e09600',
          700: '#b37800',
          800: '#865a00',
          900: '#593c00'
        },
        'persian_red': {
          DEFAULT: '#cc2936',
          50: '#fceced',
          100: '#f9d9db',
          200: '#f3b3b7',
          300: '#ed8d93',
          400: '#e7676f',
          500: '#cc2936',
          600: '#a6212b',
          700: '#801920',
          800: '#5a1115',
          900: '#33090a'
        },
        'mindaro': {
          DEFAULT: '#cbff8c',
          50: '#f4ffe8',
          100: '#e9ffd1',
          200: '#d3ffa3',
          300: '#bdff75',
          400: '#a7ff47',
          500: '#cbff8c',
          600: '#9ee656',
          700: '#7bb341',
          800: '#58802c',
          900: '#354d17'
        },
        'neutral_dark': '#020122',
        'sidebar_text': '#f8f9fa',
        'risd_faded': '#7984f1',
        'yellow_faded': '#ffd666'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      animation: {
        'slideInUp': 'slideInUp 0.5s ease-out',
        'slideInDown': 'slideInDown 0.5s ease-out', 
        'slideInLeft': 'slideInLeft 0.4s ease-out',
        'slideInRight': 'slideInRight 0.4s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'confetti-fall': 'confettiFall 3s ease-out forwards',
      },
      keyframes: {
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(55, 88, 237, 0.3)' },
          to: { boxShadow: '0 0 30px rgba(55, 88, 237, 0.6)' }
        },
        wiggle: {
          '0%, 7%': { transform: 'rotateZ(0)' },
          '15%': { transform: 'rotateZ(-15deg)' },
          '20%': { transform: 'rotateZ(10deg)' },
          '25%': { transform: 'rotateZ(-10deg)' },
          '30%': { transform: 'rotateZ(6deg)' },
          '35%': { transform: 'rotateZ(-4deg)' },
          '40%, 100%': { transform: 'rotateZ(0)' }
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}