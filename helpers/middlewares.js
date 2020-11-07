const createError = require('http-errors');
const axios = require('axios');

exports.logInToken = async () => {
  const getToken = await axios.post('http://localhost:3000/login');
  return getToken;
}

exports.getOwnPolicies = async (email) => {
  const policies = await axios.post('http://localhost:3000/login');
  const ownPolicies = policies.filter(item =>  item.email === email);
  return ownPolicies;
}

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(422))
  } else {
    next();
  }
}