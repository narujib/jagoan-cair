import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: ['.next', '.turbo', 'dist', 'coverage', 'out', 'node_modules'],
    rules: {
      'react/no-unescaped-entities': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
];

export default config;
