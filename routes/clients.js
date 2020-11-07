var express = require('express');
var router = express.Router();
var axios = require('axios');
const createError = require('http-errors');
const { getToken } = require('../data/data');




/* Retrieve clients. */
router.get('/', (req, res, next) => {
  const request = {
    method: 'GET',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/clients',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.session.currentUser}`
    }
  };
  const getClient = async () => {
    axios(request)
    .then((response) =>  {
      res.status(200).json(response.data);
      // console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  getClient();
});

/* Retrieve individual client. */
router.get('/:id', (req, res, next) => {
  const request = {
    method: 'GET',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/clients',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.session.currentUser}`
    }
  };
  const { id } = req.params;
  console.log('id', id);
  const getClient = async () => {
    axios(request)
    .then((response) =>  {
      const client = response.data.filter(item => item.id == id);
      console.log(client);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getClient();
});

module.exports = router;
