/* eslint-disable @typescript-eslint/no-var-requires */
const { version } = require('./package.json');
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
module.exports = {
  trailingSlash: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  webpack(config, options) {
    const { webpack } = options;

    config.node = {
      __dirname: true,
    };

    // Define value to inject
    config.plugins.push(
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(version),
      })
    );

    // Webpack rules
    config.module.rules.push({
      test: /\.(gif|png|jpe?g|webm)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: false,
            name: 'static/assets/[name].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  poweredByHeader: false,
};
