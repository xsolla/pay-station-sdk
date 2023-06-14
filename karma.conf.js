module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', 'karma-typescript'],
    files: ['src/**/*.ts'],
    preprocessors: {
      '**/*.ts': 'karma-typescript',
    },
    karmaTypescriptConfig: {
      compilerOptions: {
        module: 'commonjs',
      },
      tsconfig: './tsconfig.json',
    },
    coverageOptions: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
      watermarks: {
        branches: [65, 80],
        functions: [65, 80],
        lines: [65, 80],
        statements: [65, 80],
      },
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
  });
};
