module.exports = {
  extends: [
    require.resolve('@umijs/lint/dist/config/eslint'),
    'plugin:@nx/react',
    '../../.eslintrc.json',
  ],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {},
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
};
