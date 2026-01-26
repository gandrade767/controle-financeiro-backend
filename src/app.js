const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config();

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: "ok", time: new Date() });
});

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;