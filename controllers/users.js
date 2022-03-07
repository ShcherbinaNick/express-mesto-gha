const User = require('../models/user');
const { handleError, NOT_FOUND_ERROR } = require('../errors/errors');

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
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
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
