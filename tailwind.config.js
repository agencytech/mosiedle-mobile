/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{tsx,ts,js,jsx}",
        "./components/**/*.{tsx,ts,js,jsx}",
        "./navigation/**/*.{tsx,ts,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FD5959",
            },
        },
    },
    plugins: [],
};
