/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    "darkMode": 'class',

    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "1020px",
            xl: "1440px",
        },
        extend: {
            dropShadow: { 'white-lg': '0 10px 8px rgba(255, 255, 255, 0.04), 0 4px 3px rgba(255, 255, 255, 0.1)', },
            colors: {
                lightBlue: "hsl(215.02, 98.39%, 51.18%)",
                darkBlue: "hsl(213.86, 58.82%, 46.67%)",
                lightGreen: "hsl(156.62, 73.33%, 58.82%)",
                darkBg: '#1a202c',
                darkCard: '#2d3748'

            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            spacing: {
                180: "32rem",
            },
        },
    },
    plugins: [],
}

