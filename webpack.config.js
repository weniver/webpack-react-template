const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

let [mode, target] =
  process.env.NODE_ENV === "production"
    ? ["production", "browserslist"]
    : ["development", "web"];

module.exports = {
  //more info in development if you use production all is minified and compact
  mode: mode,
  //fix bug browserlsit
  target: target,
  //change output dir fot images
  output: {
    //you should add a path to your dist to use Clean webpack plugin
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    //handle images in css and you can import them in js too
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //asset/resource in the most common but if you leave asset webpack
        //also inline some images if they are minus 80kb in size
        type: "asset",
      },
      {
        //matches a dot s either a or c and ss at the end of the word
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        //match all files ending with .js t(he $ means ending in)
        test: /\.js$/,
        //always exclude your node_modules
        exclude: /node_modules/,
        use: {
          //use loader for babel, without additional settings, this will reference .babelrc
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
  //adds source maps
  devtool: "source-map",
  //add a dev server and tell it where is your content
  devServer: { contentBase: "./dist", hot: true },
};
