const path = require('path');
const { getLoader, loaderByName, addAfterLoader } = require('@craco/craco');

const packages = [];
packages.push(path.join(__dirname, '../lib'));

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      // 處理外部資料夾 babel loader 的編譯
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      // 處理引用 src 外的文件
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      const markdownLoader = {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('raw-loader'),
          },
        ],
      };
      addAfterLoader(webpackConfig, loaderByName('babel-loader'), markdownLoader);

      return webpackConfig;
    },
  },
};
