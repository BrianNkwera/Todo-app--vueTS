const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devServer: {
    before: (app) => {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://dev.hisptz.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/',
          },
        })
      );
    },
  },
};
