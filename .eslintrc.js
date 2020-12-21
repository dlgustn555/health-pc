module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'jsx-a11y', 'react-hooks', 'prettier'],
    parser: 'babel-eslint',
    rules: {
        'no-unused-vars': 1,
        'react/prop-types': 0,
        'prettier/prettier': 'error',
    },
}
