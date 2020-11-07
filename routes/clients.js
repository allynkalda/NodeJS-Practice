var express = require('express');
var router = express.Router();
var axios = require('axios');
const createError = require('http-errors');
const { logInToken, getOwnPolicies } = require('../helpers/middlewares');
const { getToken } = require('../data/data');

const getRequest = (tok) => {
  return {
    method: 'GET',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/clients',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tok}`
    }
  }
}
/* Retrieve clients. */
router.get('/', (req, res, next) => {

  let limit = 10;
  let page = 1;
  if (req.query.limit) {
      limit = parseInt(req.query.limit);
  }
  if (req.query.page) {
      page = parseInt(req.query.page)
  }

  const getClients = async () => {
    logInToken()
      .then((response) => {
        const token = response.data.token;
        axios(getRequest(token))
        .then((response) =>  {
          let data;
          if (req.query.name) {
            data = response.data.filter(item =>  item.name === req.query.name);
          } else {
            data = response.data.slice(page * limit, limit * (page + 1));
          }
          res.status(200).json(data);
        })
        .catch((error) => {
          const data = {
            code: error.response.data.code,
            message: error.response.data.message
          }
          response.status(data.code).json(data);
        });
      })
      .catch((error) => {
        const data = {
          code: error.response.data.code,
          message: error.response.data.message
        }
        response.status(data.code).json(data);
      });
  }
  getClients();
});

/* Retrieve individual client. */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const getClients = async () => {
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
  getClients();
});

/* Retrieve individual client. */
router.get('/:id/policies', (req, res, next) => {
  const { id } = req.params;
  const getClients = async () => {
    logInToken()
      .then((response) => {
        const token = response.data.token;
        axios(getRequest(token))
        .then((response) =>  {
          const client = response.data.filter(item => item.id == id);
          if (client[0].id) {
            getOwnPolicies(client[0].id)
              .then(data => res.status(200).json(data))
              .catch(error => console.log(error))
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  getClients();
});
module.exports = router;
