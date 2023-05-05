const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const db = require('./util/database')

const app = express()

const apiRoutes = require('./routes/fetch-api')

// db.execute('SELECT * FROM api_data').then(result => {
//     console.log(result)
// }).then(err => console.log(err))

app.use(bodyParser.urlencoded({extended: false}))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


app.use('/',apiRoutes) 

app.listen(3000)