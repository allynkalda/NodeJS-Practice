var express = require('express');
var router = express.Router();
var axios = require('axios');
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

/* Retrieve the auth token. */
router.post('/', (req, res, next) => {
  console.log('session', req.session)
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

  const login = async () => {
    axios(request)
    .then((response) =>  {
      res.status(200).json(response.data);
      req.session.token = response.data.token;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  login();
});

module.exports = router;
