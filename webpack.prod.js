const path = require("path");
module.exports = {
  mode:"production",
  entry: {
    "codeEditor":path.resolve(__dirname,"src/main.js")
  },
  output:{
    filename: "codeEditor.js",
    path:path.resolve(__dirname, "build"),
    library: "codeEditor",
    libraryTarget:"umd"
  },
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
        test: /\.json$/,
        loader: 'json-loader'
      }
  ]
  },
  externals:{
    "@sugarlabs/musicblocks-v4-lib":"@sugarlabs/musicblocks-v4-lib"
  }
  
  
}