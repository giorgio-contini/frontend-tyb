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
        '@fonts': path.resolve(__dirname, 'src/fonts')
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
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    
    
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.tsx', // File HTML di base
    }),
  ],
};

export default config;
