const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:"development",
  devtool: false,
  entry: {
    "codeEditor":path.resolve(__dirname,"src/main.js")
  },
  output:{
    filename: "codeEditor.js",
    path:path.resolve(__dirname, "build"),
    library: "codeEditor",
    libraryTarget:"umd"
  },
  plugins: [new HtmlWebpackPlugin({
    template:"./src/template.html"
  })],
  module:{
    rules:[
      // {
      // test: /\.(js)$/,
      // use: "babel-loader",
      // exclude: /node_modules/
      // },
      {
        test:/\.(css)$/,
        exclude: /node_modules/,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
      
  ]
  },
  resolve:{
    modules:[path.resolve(__dirname,"node_modules")],
    extensions: ['.js', '.jsx', '.ts', '.d.ts'],
  }
  
  
}