const express = require('express');
const {
  getUsers, createUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', express.json(), createUser);
userRoutes.patch('/me', express.json(), updateUser);
userRoutes.patch('/me/avatar', express.json(), updateAvatar);

module.exports.userRoutes = userRoutes;
