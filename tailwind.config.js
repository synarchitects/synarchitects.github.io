/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md', './src/**/*.js'],
    theme: {
        extend: {
            colors: {
                // 定义袈蓝品牌色，基于#10376F
                synarchi: {
                    50: '#edf9ff',
                    100: '#d6f0ff',
                    200: '#b5e7ff',
                    300: '#82dbff',
                    400: '#48c4ff',
                    500: '#1ea4ff',
                    600: '#0684ff',
                    700: '#006cf5',
                    800: '#0757c6',
                    900: '#0d4c9b',
                    950: '#10376F',
                },
            },

            typography: (theme) => ({
                slate: {
                    css: {
                        '--tw-prose-headings': theme('colors.slate.800'),
                        '--tw-prose-lead': theme('colors.slate.800'),
                        '--tw-prose-bold': theme('colors.slate.800'),
                        '--tw-prose-links': theme('colors.slate.800'),
                        a: {
                            fontWeight: 'normal',
                            textDecoration: 'underline',
                            textDecorationThickness: '1px',
                            textUnderlineOffset: '4px',
                            textDecorationColor: theme('colors.slate.800'),
                            '&:hover': {
                                textDecorationColor: theme('colors.slate.400'),
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
