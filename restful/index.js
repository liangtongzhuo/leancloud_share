'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const app = require('express')();
app.use('/', require('blue-rest'));
app.listen(3000, () => {
  console.log('server start')
});