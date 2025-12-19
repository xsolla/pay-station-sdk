const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

const config = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.string-style.s[ac]ss$/i,
        use: ['raw-loader', 'sass-loader'],
      },
      {
        test: /(?<!\.string-style)\.s[ac]ss/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: false,
  },
  output: {
    library: {
      name: 'PayStationSdk',
      type: 'umd',
    },
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[name].css',
    }),
  ],
};

module.exports = (env, argv) => {
  const rootPath = path.resolve(__dirname, '../../');

  const envFile =
    argv.mode === 'development' ? '.env.development' : '.env.production';

  const envPath = path.resolve(rootPath, envFile);
  const envVars = dotenv.config({ path: envPath });

  const processEnv = {};

  if (envVars.parsed) {
    Object.keys(envVars.parsed).forEach((key) => {
      processEnv[`process.env.${key}`] = JSON.stringify(envVars.parsed[key]);
    });
  }

  Object.keys(process.env).forEach((key) => {
    processEnv[`process.env.${key}`] = JSON.stringify(process.env[key]);
  });

  config.plugins.push(new webpack.DefinePlugin(processEnv));

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.output.clean = false;
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 1000,
      aggregateTimeout: 300,
    };
  } else {
    config.output.clean = true;
  }

  return config;
};
