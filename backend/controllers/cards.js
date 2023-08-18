// controllers/cards.js
// это файл контроллеров

const Card = require("../models/cards");

const {
  NotFoundError, //404
  ServerError, //500
  ValidationError, //400
  WrongLoginPassw, //401
  AccessError, //403
  RegistrationError, // 409
} = require("../errors/errors");

function createCard(req, res, next) {
  const { name, link } = req.body;
  console.log("card created");
  Card.create({ name: name, link: link, owner: req.user._id })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
}

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
}

function deleteCardByID(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найден");
      }
      if (req.user._id == card.owner) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            res.status(200).send({ data: card });
          })
          .catch((err) => {
            if (err.name === "CastError") {
              next(new ValidationError("Переданы некорректные данные"));
              return;
            }
            next(err);
          });
      } else {
        throw new AccessError("нет Доступа");
      }
    })
    .catch((err) => next(err));
}

function setLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найден");
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
}

function delLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найден");
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        throw new ValidationError("Переданы некорректные данные");
      }
      next(err);
    })
    .catch((err) => next(err));
}

module.exports = {
  createCard,
  getCards,
  deleteCardByID,
  setLikeCard,
  delLikeCard,
};
