const webpack = require('webpack');
const config = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EssayWebpackUpload = require('essay-webpack-upload');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = module.exports = {};
const isProduction = process.env.NODE_ENV === 'production';
const isUpload = process.env.NODE_ENV === 'upload';
const isSprite = process.env.NODE_ENV === 'sprite';

const curDate = new Date();
const curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getDate() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds();

const bannerTxt = config.name + ' ' + config.version + ' ' + curTime; //构建出的文件顶部banner(注释)内容

webpackConfig.entry = {
    vender: [
        'babel-polyfill',
        'classnames',
        'react',
        'react-dom',
        'react-router',
        'react-router-dom'
    ],
    app: './src/index.jsx'
};

webpackConfig.output = {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
};

webpackConfig.resolve = {
    extensions: ['.js', '.jsx']
},
webpackConfig.module = {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ['css-loader?-autoprefixer', {
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
            use: ['css-loader?-autoprefixer',
                {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, 'postcss.config.js')
                        }
                    }
                },
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    // Provide path to the file with resources
                    resources: './src/assets/css/_common.scss'
                    //resources: ['./path/to/vars.scss', './path/to/mixins.scss']
                  },
                }
            ]
        })
    }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: /beacon/,
        use: [
            {
                loader: 'babel-loader'
            }
        ]
    }, {
        test: /\.(png|jpg|gif|webp)$/,
        loader: 'url-loader',
        options: {
            limit: 3000,
            name: 'assets/i/[name].[ext]',
        }
    }]
};

webpackConfig.plugins = [
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new ExtractTextPlugin({
        filename: 'assets/css/app.css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vender",
        minChunks: Infinity
    })
];
if (isProduction || isUpload) {
    //webpackConfig.devtool = '#cheap-module-source-map';
    webpackConfig.devtool = false;
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false
              },
              compress: true
            }
        }),
        new webpack.BannerPlugin(bannerTxt)
    ]);
    if(isProduction) {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            // 执行npm run build时查看代码大小
            new BundleAnalyzerPlugin()
        ]);
    }
    if (isUpload) {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new EssayWebpackUpload({
                host: '192.168.181.73',
                port: '3000',
                source: 'build',
                cdnDir: config.ftpServer,
                previewDir: config.previewDir
            })
        ]);
    }
} else {
    webpackConfig.output.publicPath = '/';
    webpackConfig.devtool = '#cheap-module-eval-source-map';
    webpackConfig.devServer = {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true, //gzip压缩
        historyApiFallback: true
    };
}