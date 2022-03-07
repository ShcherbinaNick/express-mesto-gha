const express = require('express');
const { cardsRoutes } = require('./cards');
const { userRoutes } = require('./users');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);
routes.use((req, res) => {
  res.status(404).send({ message: 'Cтраница не найдена' });
});

module.exports.routes = routes;
