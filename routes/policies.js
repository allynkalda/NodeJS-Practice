var express = require('express');
var router = express.Router();
var axios = require('axios');
const createError = require('http-errors');
const { logInToken, getOwnPolicies } = require('../helpers/middlewares');

const getRequest = (tok) => {
    return {
      method: 'GET',
      url: 'https://dare-nodejs-assessment.herokuapp.com/api/policies',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tok}`
      }
    }
  }
  /* Retrieve policies. */
  router.get('/', (req, res, next) => {
    
    let limit = 10;
    let page = 0;
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.page) {
        page = parseInt(req.query.page)
    }
  
    const getPolicies = async () => {
      logInToken()
        .then((response) => {
          const token = response.data.token;
          axios(getRequest(token))
          .then((response) =>  {
            const limited = response.data.slice(page * limit, limit * (page + 1));
            res.status(200).json(limited);
          })
          .catch((error) => {
            console.log(error)
            response.status(error).json(data);
          });
        })
        .catch((error) => {
          console.log(error)
          response.status(data.code).json(data);
        });
    }
    getPolicies();
  });

  /* Retrieve individual policies. */
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    const getPolicy = async () => {
      logInToken()
        .then((response) => {
          const token = response.data.token;
          axios(getRequest(token))
          .then((response) =>  {
            const client = response.data.filter(item => item.id == id);
            res.status(200).json(client);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    getPolicy();
  });

  module.exports = router;