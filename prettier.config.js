// prettier.config.js
module.exports = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'none',
  jsxSingleQuote: true,
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn'],
  plugins: ['prettier-plugin-tailwindcss']
}
