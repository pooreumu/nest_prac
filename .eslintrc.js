module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '@nestjs/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@decorator/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@auth/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@user/**',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: '@post/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@comment/**',
            group: 'internal',
            position: 'after',
          },
        ],

        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      { classes: ['field', 'constructor', 'method'] },
    ],
  },
};
