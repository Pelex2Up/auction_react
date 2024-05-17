const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://auction.magnetica.by',
            changeOrigin: true,
            secure: true,
        }),
    );
}