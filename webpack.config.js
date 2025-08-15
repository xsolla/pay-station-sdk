const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            // Используем .swcrc конфигурацию с переопределением для development
            options: {
              sourceMaps: isDev,
              minify: false, // Оставляем минификацию webpack'у для лучшего контроля
            },
          },
        },

        // *.string-style.s[ac]ss -> строка CSS (raw-loader + sass-loader)
        {
          test: /\.string-style\.s[ac]ss$/i,
          use: ['raw-loader', 'sass-loader'],
        },

        // обычные scss -> в style.css
        {
          test: /(?<!\.string-style)\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { url: false },
            },
            'sass-loader',
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.js'],
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
      globalObject: 'this', // на всякий случай для UMD в разных средах
    },

    plugins: [
      new ESLintPlugin({ extensions: ['ts'] }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[name].css',
      }),
    ],

    devtool: isDev ? 'inline-source-map' : 'source-map',
    mode: argv.mode || 'production',
    target: ['web', 'es2015'],
    stats: 'minimal',
    
    // Включаем файловый кеш для ускорения пересборки
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    
    // Оптимизации для production
    optimization: {
      minimize: !isDev,
      sideEffects: false,
    }
  };
};
