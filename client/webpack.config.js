const path = require("path")
const webpack = require("webpack")

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: [path.join(__dirname, "/index.tsx")],
    mode: "development",
    output: {
        filename: "bundle.js",
        publicPath: "/",
        path: path.join(__dirname + "/dist"),
        // filename: 'dist/[name].js',
        // sourceMapFilename: 'build/[name].js.map'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new webpack.DefinePlugin({ // reduce React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks 
        new CompressionPlugin({ // GZip Compression
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 1024,
            minRatio: 0.8
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader"},
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            // {
            //     test: /\.md$/,
            //     use: [
            //         { loader: "file-loader" }
            //     ]
            // },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};