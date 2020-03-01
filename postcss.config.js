// postcss.config.js
//
// PurgeCSS setup care of the following:
// https://markus.oberlehner.net/blog/setting-up-tailwind-css-with-vue/

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project 
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './public/**/*.html'
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  // See: https://tailwindcss.com/docs/controlling-file-size/#understanding-the-regex
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],

  // Whitelist auto generated classes for transitions and router links.
  // From: https://github.com/ky-is/vue-cli-plugin-tailwind
  whitelistPatterns: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/],

});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}