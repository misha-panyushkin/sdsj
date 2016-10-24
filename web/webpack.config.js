var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './public/entry.js'
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: path.join(__dirname, './public/scripts')
    },  
    module: {
        loaders: [
            { 
                test: /\.less$/, 
                exclude: /node_modules/, 
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version"]}!less-loader' 
            },
            { 
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/, 
                include: path.join(__dirname, 'public'),
                query: {
                    presets: ['stage-0', 'es2015', 'react'],
                    plugins: ['transform-decorators-legacy']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    APP_PORT: JSON.stringify(process.env.APP_PORT),
                    APP_LOG_LEVEL: JSON.stringify(process.env.APP_LOG_LEVEL)
                }
            }
        })
    ],
    watchOptions: {
        poll: true
    }
};