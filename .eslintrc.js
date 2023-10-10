require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential',

        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-prettier',
        'plugin:vitest-globals/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true,
                'vitest-globals/env': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'vue'
    ],
    'rules': {},

};
