import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#EC4899",
                secondary: "#F9A8D4",
                cta: "#8B5CF6",
                background: "#FDF2F8",
                text: "#831843",
            },
            fontFamily: {
                heading: ["var(--font-lora)", "serif"],
                body: ["var(--font-raleway)", "sans-serif"],
            },
            boxShadow: {
                'soft': '0 10px 25px -5px rgba(236, 72, 153, 0.1), 0 8px 10px -6px rgba(236, 72, 153, 0.1)',
            }
        },
    },
    plugins: [],
};
export default config;
