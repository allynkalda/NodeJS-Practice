var express = require('express');
var router = express.Router();
var axios = require('axios');
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

/* Retrieve clients. */
router.get('/', (req, res, next) => {
  console.log('session', req.session)
  const request = {
    method: 'GET',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/clients',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.session.token}`
    }
};

  const getClient = async () => {
    axios(request)
    .then((response) =>  {
      res.status(200).json(response.data);
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getClient();
});

module.exports = router;
