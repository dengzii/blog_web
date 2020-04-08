const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    module: {
        rules: [{
            test: /\.tsx?$/,
            // ts-loader是官方提供的处理tsx的文件
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test:/\.css$/,
            use:[
                'style-loader','css-loader'
            ]
        }]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};