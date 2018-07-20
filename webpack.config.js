const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    const isProduction = (env !== 'development');

    return [
        // für js
        {
            entry: createEntries(path.resolve(__dirname, 'src/js'), '*.js'),
            output: {
                filename: '[name]',
                path: path.resolve(__dirname, 'dist/js')
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            { loader: 'style-loader' },
                            { loader: 'css-loader', options: { minimize: isProduction } },
                            { loader: 'postcss-loader' }
                        ]
                    },
                    {
                        test: /locales/,
                        loader: '@alienfast/i18next-loader'
                    }
                ]
            }
        },

        // für css
        {
            entry: createEntries(path.resolve(__dirname, 'src/css'), '*.css'),
            output: {
                filename: '[name]',
                path: path.resolve(__dirname, 'dist/css')
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                { loader: 'css-loader', options: { url: false, minimize: isProduction } },
                                { loader: 'postcss-loader' }
                            ]
                        })
                    }
                ]
            },
            plugins: [
                new ExtractTextPlugin('[name]')
            ]
        }
    ]
};

// Findet alle Dateien mit filePattern im Verzeichnis base
function createEntries(base, filePattern) {
    return glob.sync(filePattern, { matchBase: true, cwd: base })
        .reduce((entries, file) => {
            entries[file] = path.resolve(base, file);
            return entries;
        }, {});
}
