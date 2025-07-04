/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'graBackColor': 'linear-gradient(to bottom, #375DDC, #1F3EA6)',
            },

        },
    },
    plugins: [],
}