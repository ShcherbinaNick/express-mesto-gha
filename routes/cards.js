const express = require('express');
const {
  getCards, createCard, deleteCard, setCardLike, deleteCardLike,
} = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), createCard);
cardsRoutes.delete('/:cardId', deleteCard);
cardsRoutes.put('/:cardId/likes', setCardLike);
cardsRoutes.delete('/:cardId/likes', deleteCardLike);

module.exports.cardsRoutes = cardsRoutes;
