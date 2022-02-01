module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          android: '67',
          chrome: '67',
          edge: '17',
          firefox: '60',
          ios: '15.2',
          safari: '11.1'
        },
        useBuiltIns: 'usage',
        corejs: '3.6.5'
      }
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['babel-plugin-styled-components', { ssr: true }]
  ]
};
