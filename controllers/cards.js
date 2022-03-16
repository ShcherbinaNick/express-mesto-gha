const Card = require('../models/card');
const { handleError, NOT_FOUND_ERROR } = require('../errors/errors');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    if (cards) {
      res.status(200).send(cards);
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    if (card) {
      res.status(201).send(card);
    } else {
      res.status(NOT_FOUND_ERROR).send({ message: 'Не получилось создать карточку' });
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const card = await Card.findById(cardId);
    if (!card) {
      throw new Error({ message: 'Карточки с таким id не найдено' });
    }

    const cardOwner = card.owner.valueOf();
    if (cardOwner !== userId) {
      throw new Error('Удалять можно только свои карточки');
    }

    const removeCard = await Card.findByIdAndRemove(cardId);
    if (!removeCard) {
      throw new Error({ message: 'Неверный id карточки' });
    }
    res.send({ message: 'Карточка удалена' });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.setCardLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      res.status(NOT_FOUND_ERROR).send({ message: 'Нет карточки для лайка' });
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports.deleteCardLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      res.status(NOT_FOUND_ERROR).send({ message: 'Нет карточки для дизлайка' });
    }
  } catch (err) {
    handleError(err, res);
  }
};
