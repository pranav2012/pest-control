import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#25D366',    // WhatsApp green
                    secondary: '#075e54',  // Dark green
                    tertiary: '#128C7E',   // Medium green
                    light: '#e7f5e8',      // Light green background
                },
                whatsapp: {
                    DEFAULT: '#25D366',
                    dark: '#075e54',
                    medium: '#128C7E',
                    light: '#e7f5e8',
                },
                success: {
                    DEFAULT: '#25D366',
                    dark: '#075e54',
                    light: '#e7f5e8',
                },
                surface: {
                    white: '#FFFFFF',
                    light: '#F9FAFB',
                    dark: '#111827',
                },
                text: {
                    primary: '#111827',
                    secondary: '#4B5563',
                    muted: '#6B7280',
                    white: '#FFFFFF',
                },
                accent: {
                    DEFAULT: '#25D366',
                    hover: '#128C7E',
                    light: '#e7f5e8',
                },
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-brand': 'linear-gradient(to right bottom, #25D366, #128C7E)',
                'gradient-brand-light': 'linear-gradient(to right, rgba(37, 211, 102, 0.1), rgba(18, 140, 126, 0.1))',
                'pattern-dots': 'radial-gradient(circle, var(--tw-gradient-stops) 1px, transparent 1px)',
                'pattern-grid': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E")`,
            },
            boxShadow: {
                'glow': '0 20px 40px -15px rgba(0,0,0,0.1)',
                'glow-brand': '0 20px 40px -15px rgba(37, 211, 102, 0.1)',
                'glow-hover': '0 25px 50px -12px rgba(37, 211, 102, 0.25)',
            },
            opacity: {
                '15': '0.15',
            },
        },
    },
    plugins: [],
};

export default config; 