const merge = require('webpack-merge');
const getReactWebpackConfig = require('@nrwl/react/plugins/webpack');
const autoprefixer = require('autoprefixer');

module.exports = config => {
  const original = getReactWebpackConfig(config);
  return merge({
    customizeArray: merge.unique('module.rules', ['ScssLoader'], rule =>
      rule.test.test('example.scss') ? 'ScssLoader' : ''
    )
  })(
    {
      module: {
        rules: [
          {
            test: /\.module\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  sourceMap: true,
                  plugins: () => [autoprefixer()]
                }
              },
              'sass-loader'
            ]
          }
        ]
      }
    },
    original
  );
};
