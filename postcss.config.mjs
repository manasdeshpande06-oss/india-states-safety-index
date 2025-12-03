/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Use the new PostCSS adapter package for Tailwind CSS
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;
