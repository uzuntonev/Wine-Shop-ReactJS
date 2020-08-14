const express = require('express');
const dbConnection = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

dbConnection()
  .then(() => {
    const root = require('path').join(__dirname, '/client/build');
    app.use(express.static(root));
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root });
    });
    require('./config/express');
    console.log('DB is connected...');
  })
  .catch((err) => console.error(err));
