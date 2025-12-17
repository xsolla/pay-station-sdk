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
    symlinks: false, // Не следовать симлинкам, чтобы отслеживать изменения напрямую
  },
  output: {
    library: {
      name: 'PayStationSdk',
      type: 'umd',
    },
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
    clean: true, // По умолчанию очищать, но переопределяется в зависимости от режима
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
  // Определяем путь к корню монорепозитория
  const rootPath = path.resolve(__dirname, '../../');

  // Настройка загрузки .env файлов в зависимости от режима
  const envFile =
    argv.mode === 'development' ? '.env.development' : '.env.production';

  // Загружаем переменные окружения из .env файла в корне монорепозитория
  const envPath = path.resolve(rootPath, envFile);
  const envVars = dotenv.config({ path: envPath });

  // Создаем объект для DefinePlugin (заменяет process.env на статические значения во время сборки)
  const processEnv = {};

  // Добавляем переменные из .env файла
  if (envVars.parsed) {
    Object.keys(envVars.parsed).forEach((key) => {
      processEnv[`process.env.${key}`] = JSON.stringify(envVars.parsed[key]);
    });
  }

  // Добавляем системные переменные окружения (если они не переопределены в .env)
  Object.keys(process.env).forEach((key) => {
    if (!processEnv[`process.env.${key}`]) {
      processEnv[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
  });

  // DefinePlugin заменяет process.env на статические значения во время сборки
  // Это необходимо для UMD библиотеки, которая будет использоваться в браузере
  config.plugins.push(new webpack.DefinePlugin(processEnv));

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.output.clean = false; // Не очищать dist при dev, чтобы не удалять .d.ts файлы от tsc
    // Настройки для отслеживания изменений в watch режиме
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 1000, // Проверять изменения каждую секунду
      aggregateTimeout: 300, // Задержка перед пересборкой после изменений
    };
  } else {
    config.output.clean = true; // Очищать dist при production сборке
  }

  return config;
};
