const router = require('../routes');

module.exports = (app) => {
  app.use('/api/auth', router.auth);
  app.use('/api/products', router.product);
  app.use('*', (req, res) => {
    res.sendFile('index.html', { root });
  });
};
