const { authCookie: authCookieName } = require('../config/config');
const { verifyToke } = require('../utils/jwt');
const { TokenBlackListModel, UserModel } = require('../models');

function auth(redirectUnauthenticated = true) {
  return function (req, res, next) {
    const token = req.cookies[authCookieName];
    Promise.all([verifyToke(token), TokenBlackListModel.findOne({ token })])
      .then(([data, blackedListToken]) => {
        if (blackedListToken) {
          return Promise.reject(new Error('blacklisted token'));
        }
        UserModel.findById(data.id).then((user) => {
          req.user = user;
          next();
        });
      })
      .catch((err) => {
        if (!redirectUnauthenticated) {
          next();
          return;
        }
        if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
          res.status(401).send({msg: 'You are not authorized'});
          return;
        }
        if (err.message === 'blacklisted token') {
          res.status(401).send({msg: 'You are not authorized'});
          return;
        }
        if (err.message === 'jwt must be provided') {
          res.status(401).send({msg: 'You are not authorized'});
          return;
        }
        next(err);
      });
  };
}

module.exports = auth;
