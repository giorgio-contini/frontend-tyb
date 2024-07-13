const path = require('path');

module.exports = {
    entry: './src/index.tsx', // Punto di ingresso TypeScript
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'], // Estensioni di file da risolvere
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
