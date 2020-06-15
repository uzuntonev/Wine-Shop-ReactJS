const router = require('../routes');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/api/auth', router.auth);
  app.use('/api/products', auth(), router.product);
  app.use('*', (req, res, next) => res.send('<h1> Wrong route maybe? </h1>'));
};
