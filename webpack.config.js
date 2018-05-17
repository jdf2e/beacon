const webpack = require('webpack');
const config = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EssayWebpackUpload = require('essay-webpack-upload');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpackConfig = module.exports = {};
const isProduction = process.env.NODE_ENV === 'production';
const isUpload = process.env.NODE_ENV === 'upload';

const curDate = new Date();
const curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getDate() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds();

const bannerTxt = curTime; //构建出的文件顶部banner(注释)内容

webpackConfig.entry = {
    vender: [
        'babel-polyfill',
        'classnames',
        'react',
        'react-dom',
        'axios',
        'react-router',
        'react-router-dom'
    ],
    index: ['./src/index.jsx'],
    beacon: ['./src/beacon.jsx']

};

webpackConfig.output = {
    path: path.resolve(__dirname, 'dist'),
    publicPath: config.publicPath + '/',
    filename: 'js/[name].js'
};

webpackConfig.resolve = {
    extensions: ['.js', '.jsx']
};
webpackConfig.module = {
    rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, 'postcss.config.js')
                        }
                    }
                }]
            }),
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, 'postcss.config.js')
                            }
                        }
                    },
                    'sass-loader'
                ]
            })
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.(png|jpg|gif|webp)$/,
            loader: 'url-loader',
            options: {
                limit: 3000,
                name: 'assets/i/[name].[ext]',
            }
        },
        {
            test: /\.md$/,
            loader: 'raw-loader'
        }
    ]
};

webpackConfig.plugins = [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
        filename: './index.html',
        chunks: ["vender", "index"],
        template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
        filename: './beacon.html',
        chunks: ["vender", "beacon"],
        template: './src/beacon.html'
    }),
    new ExtractTextPlugin({
        filename: 'assets/[name].css'
    }),
    new webpack.BannerPlugin(bannerTxt),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vender",
        chunks: ['index', 'beacon'],
        minChunks: Infinity
    })
];

if (isProduction || isUpload) {
    webpackConfig.devtool = '#cheap-module-source-map';
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('"production"')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
    if (isUpload) {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new EssayWebpackUpload({
                host: '192.168.181.73',
                port: '3000',
                source: 'build',
                cdnDir: config.ftpServer,
                previewDir: config.ftpTarget
            })
        ]);
    }
} else {
    webpackConfig.output.publicPath = '/';
    webpackConfig.devtool = '#cheap-module-eval-source-map';
    webpackConfig.devServer = {
        contentBase: path.resolve(__dirname, 'build/'),
        compress: true, //gzip压缩
        historyApiFallback: true,
    };
}