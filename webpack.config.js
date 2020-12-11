const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [ // rules — это массив правил

      // Правила для обработки через Babel
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },

      // Правила для обработки картинок и шрифтов
      {
        // регулярное выражение, которое ищет все файлы картинок и шрифтов
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },

      // Правило для обрабоки файлов CSS
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader']
      },
    ]
  },
  plugins: [
    // Задействовали плагин для обработки html файлов
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    // Плагин очищает содержимое папки, куда собирается сборка вебпака
    new CleanWebpackPlugin(),
    // Плагин собирает много css файлов в один
    new MiniCssExtractPlugin()
  ]
};