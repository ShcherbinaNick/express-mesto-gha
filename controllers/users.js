const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(404).send('Нет пользователей');
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    if (user) {
      res.status(201).send(user);
    } else {
      res.status(400).send('Пользователь не создан. Проверьте правильность ввода данных');
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true, upsert: true },
    );
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(400).send({ message: 'Не получилось обновить пользователя' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const { userId } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true, upsert: true },
    );
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(400).send({ message: 'Не получилось обновить аватар' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
