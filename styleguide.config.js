module.exports = {
  title: 'React Style Guide Example',
  components: 'src/components/**/*.{ts,tsx}',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('./webpack.config')
};
