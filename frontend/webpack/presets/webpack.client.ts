import HtmlWebpackPlugin from 'html-webpack-plugin'; 
import { Configuration } from 'webpack'; 
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'; 
import WebpackBar from 'webpackbar'; 

// To analyze the bundle sizes
const isAnalyze = Boolean(process.env.ANALYZE); 

// Webpack configuration for the client
const webpackClientConfig = (args: { mode: string }): Configuration => { 
    const { mode } = args;
    const isProductionMode = mode === 'production';
    const title = 'My Website Title'; // Set the title for HTML plugin

    const webpackConfig: Configuration = { 
        entry: { 
            main: './src/client/index.tsx', // Entry point for the client app
        }, 
        output: { 
            publicPath: 'http://localhost:3001/', // Public path for webpack-dev-server
        }, 
        plugins: [ 
            new HtmlWebpackPlugin({ 
                title, 
                template: './src/client/index.html', 
                filename: './index.html', // Output HTML filename
            }), 
            new WebpackBar({ 
                name: 'client', 
                color: '#2EA1F8', // Progress bar color
            }), 
        ], 
    };

    // If production mode, modify output for better optimization
    if (isProductionMode) { 
        webpackConfig.output = { 
            filename: '[name].js', 
            chunkFilename: '[name].js', 
            publicPath: '/', // Use root public path for production
        }; 
    }

    // If analyzing bundle sizes, add BundleAnalyzerPlugin
    if (isAnalyze) { 
        webpackConfig.plugins = [ 
            ...(webpackConfig.plugins || []), 
            new BundleAnalyzerPlugin({ 
                analyzerPort: 9001, // Port for the bundle analyzer report
            }), 
        ]; 
    }

    return webpackConfig; 
}; 

export default webpackClientConfig;
