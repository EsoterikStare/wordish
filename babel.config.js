module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
        useBuiltIns: 'usage',
        corejs: '3.6.5',
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['babel-plugin-styled-components', { ssr: true }],
  ],
};
