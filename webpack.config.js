const Dotenv = require('dotenv-webpack');
// https://cstroman.medium.com/using-environment-variables-with-react-webpack-c7a04bbf833e 
require("dotenv").config();

new webpack.DefinePlugin({
  BUILT_AT: webpack.DefinePlugin.runtimeValue(Date.now, {
    fileDependencies: [fileDep],
  }),
});


new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
});