/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8281a',
        secondary: '#f6a623',
        dark: '#1a1a1a',
        green: '#2d6a4f',
        cream: '#fff8f0',
        cream2: '#fef0dc',
        light: '#f9f5f0',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [],
};