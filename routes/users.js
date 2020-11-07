var express = require('express');
var router = express.Router();
var axios = require('axios');
const createError = require('http-errors');
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');
const { getToken } = require('../data/data');

/* Retrieve the auth token. */
router.post('/', (req, res, next) => {
  const { username, password } = req.body;

  const request = {
    method: 'POST',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/login',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
      client_id: username,
      client_secret: password
    }
};
  axios(request)
    .then((response) =>  {
      req.session.currentUser = response.data.token;
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      next(createError(400))
    });
});

module.exports = router;
