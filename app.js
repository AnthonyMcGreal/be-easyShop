const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./mvcs/routers/apiRouter');
const {
  handleCustomErrors,
  handleServerErrors,
} = require('./mvcs/error-handling');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
