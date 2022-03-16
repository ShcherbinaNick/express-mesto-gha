const express = require('express');
const {
  getUsers, getUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getMe);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', express.json(), updateUser);
userRoutes.patch('/me/avatar', express.json(), updateAvatar);

module.exports.userRoutes = userRoutes;
