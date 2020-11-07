var express = require('express');
var router = express.Router();
var axios = require('axios');
var createError = require('http-errors');
var jwt_decode = require('jwt-decode');
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');
const { getToken } = require('../data/data');

/* Retrieve the auth token. */
router.post('/', (req, res, next) => {
  const creds = {};
  if (!req.body.username) {
    creds.client_id = "dare";
    creds.client_secret = "s3cr3t"
  } else {
    const { username, password } = req.body;
    creds.client_id = username;
    creds.client_secret = password
  }

  console.log(creds);
  const request = {
    method: 'POST',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/login',
    headers: {
        'Content-Type': 'application/json'
    },
    data: creds
};
  axios(request)
    .then((response) =>  {
      req.session.currentUser = response.data.token;
      const decoded = jwt_decode(response.data.token);
      const data = {
        token: response.data.token,
        type: response.data.type,
        expires_in: decoded.exp
      };
      res.status(200).json(data);
    })
    .catch((error) => {
      const data = {
        code: error.response.data.code,
        message: error.response.data.message
      }
      response.status(data.code).json(data);
    });
});

module.exports = router;
