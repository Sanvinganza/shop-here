// .lintstagedrc.cjs
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings=10'],
  '*.{json,md,css,scss}': ['prettier --write'],
};