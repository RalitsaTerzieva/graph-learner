import Dotenv from 'dotenv-webpack';
import { resolve } from 'path';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import { Configuration } from 'webpack';

const styledComponentsTransformer = createStyledComponentsTransformer();

const webpackCommonConfig: () => Configuration = () => {
  const webpackConfig: Configuration = {
    output: {
      path: resolve('dist'),
      filename: '[name].bundle.js', // Make sure to specify a filename
      clean: true, // This cleans the output directory before each build
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // Ensure .tsx and .jsx are included
      alias: {
        '~': resolve(__dirname, '../src'),
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
          },
        },
        {
          test: /\.(ts|tsx)$/, // Ensure this rule handles both .ts and .tsx
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: [styledComponentsTransformer],
                }),
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/, // Add this rule for .js and .jsx
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Use babel-loader for JavaScript files
          },
        },
      ],
    },
    plugins: [new Dotenv()],
  };

  return webpackConfig;
};

export default webpackCommonConfig;
