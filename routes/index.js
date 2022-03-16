const express = require('express');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { cardsRoutes } = require('./cards');
const { userRoutes } = require('./users');

const routes = express.Router();

routes.post('/signup', express.json(), createUser);
routes.post('/signin', express.json(), login);

routes.use('/users', auth, userRoutes);
routes.use('/cards', auth, cardsRoutes);

routes.use((req, res) => {
  res.status(404).send({ message: 'Cтраница не найдена' });
});

module.exports.routes = routes;
