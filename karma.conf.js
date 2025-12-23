const path = require('path');
const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  const baseConfig = webpackConfig({}, { mode: 'development' });

  const testWebpackConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    module: baseConfig.module,
    resolve: {
      ...baseConfig.resolve,
      extensions: ['.ts', '.js'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../../node_modules'),
      ],
    },
    plugins: [
      ...baseConfig.plugins,
    ],
  };

  config.set({
    basePath: './',
    frameworks: ['jasmine', 'webpack'],
    files: [
      { pattern: 'src/**/*.spec.ts', watched: false },
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['webpack'],
    },
    webpack: testWebpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
