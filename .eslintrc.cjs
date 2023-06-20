/* eslint-env node */
module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        '@typescript-eslint'
    ],
    overrides: [],
    parser:  '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module'
    },
    rules: {
        'semi': ['error', 'always'],
        'no-trailing-spaces': ['error', {}]
    },
    ignorePatterns: [
        "webpack.config.js"
    ],
    root: true
};
