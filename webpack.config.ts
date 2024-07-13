import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  entry: './src/index.tsx', // File principale di ingresso TypeScript
  output: {
    path: path.resolve(__dirname, 'dist'), // Cartella di output
    filename: 'bundle.js', // Nome del bundle
    publicPath: '/', // Percorso pubblico del bundle
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Estensioni dei file da gestire da webpack
    alias: {
        'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader', // Carica i file TypeScript utilizzando ts-loader
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
       },
       {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext][query]',
        },
    },
    
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // File HTML di base
    }),
  ],
};

export default config;
