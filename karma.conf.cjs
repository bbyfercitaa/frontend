// Karma configuration
module.exports = function(config) {
  config.set({
    // Base path que será usada para resolver todos los patrones
    basePath: '',

    // Frameworks a usar
    frameworks: ['jasmine'],

    // Lista de archivos / patrones a cargar en el navegador
    files: [
      'src/**/*.spec.jsx',
      'src/**/*.spec.js'
    ],

    // Lista de archivos / patrones a excluir
    exclude: [
      'node_modules/**'
    ],

    // Preprocesar archivos antes de servirlos al navegador
    preprocessors: {
      'src/**/*.spec.jsx': ['webpack', 'sourcemap'],
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
      'src/**/*.jsx': ['webpack', 'coverage'],
      'src/**/*.js': ['webpack', 'coverage']
    },

    // Configuración de Webpack
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|gif|svg|webp)$/,
            type: 'asset/resource'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Reporters de pruebas
    reporters: ['progress', 'kjhtml', 'coverage'],

    // Configuración de cobertura
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },

    // Puerto del servidor web
    port: 9876,

    // Habilitar / deshabilitar colores en la salida
    colors: true,

    // Nivel de logging
    logLevel: config.LOG_INFO,

    // Habilitar / deshabilitar watching
    autoWatch: true,

    // Navegadores a lanzar
    browsers: ['ChromeHeadless'],

    // Configuración de Chrome Headless
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },

    // Continuous Integration mode
    singleRun: false,

    // Timeout de captura del navegador
    captureTimeout: 60000,

    // Concurrency level
    concurrency: Infinity
  });
};