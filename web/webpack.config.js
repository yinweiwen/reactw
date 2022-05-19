var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
    app: path.join(__dirname, 'client/src'),
    build: path.join(__dirname, 'client/build')
};

module.exports = {
    mode: "development",
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true
    },
    entry: {
        app: ["@babel/polyfill", PATHS.app]
    },
    output: {
        publicPath: '/client/build/',
        path: PATHS.build,
        filename: '[name].js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'client/src'), path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx'],
        alias: {
            crypto: false,
            $utils: path.resolve(__dirname, 'client/src/utils/'),
            $components: path.resolve(__dirname, 'client/src/components/'),
            $themes: path.resolve(__dirname, 'client/src/themes/')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }]
        },
        {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            include: [PATHS.app, path.resolve(__dirname, 'node_modules', '@peace')],
        }, {
            test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
            loader: "file-loader"
        }]
    }
};