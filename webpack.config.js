const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // compilerOptions: { noEmit: true },
          transpileOnly: true,
          projectReferences: true,
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin({ typescript: { build: true }})],
};
