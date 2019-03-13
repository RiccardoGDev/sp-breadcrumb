const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
mode: 'development',
    entry: {
        app: ['babel-polyfill', './src/app/BreadcrumbsCreator.tsx'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/breadcrumbsCreator.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: ['babel-loader', 'ts-loader']
            },
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

