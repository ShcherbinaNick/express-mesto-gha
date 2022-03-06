const express = require('express');
const { cardsRoutes } = require('./cards');
const { userRoutes } = require('./users');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

module.exports.routes = routes;
