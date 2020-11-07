const createError = require('http-errors');
const axios = require('axios');

exports.logInToken = async () => {
  const getToken = await axios.post('http://localhost:3000/login');
  return getToken;
}

exports.getOwnPolicies = async (id) => {
  const response = await axios.get('http://localhost:3000/policies?limit=100');
  const ownPolicies = response.data.filter(item =>  item.clientId == id);
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