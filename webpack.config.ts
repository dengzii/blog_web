import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};

export default config