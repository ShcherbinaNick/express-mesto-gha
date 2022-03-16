const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { handleError, NOT_FOUND_ERROR } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Неправильные почта или пароль');
    }
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).status(200).send({ message: 'Аутентификация пройдена' });
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.getMe = async (req, res) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      throw new Error('Пользователя с таким id не существует');
    }
    res.status(200).send(currentUser);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      name, about, avatar, email, password: hashedPass,
    });
    if (user) {
      res.status(201).send(user);
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (updatedUser) {
      res.send(updatedUser);
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const { userId } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(NOT_FOUND_ERROR).send({ message: 'Не получилось обновить аватар' });
    }
  } catch (err) {
    handleError(err, res);
  }
};
