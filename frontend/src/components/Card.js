import React from "react";
import trashUpPath from "../images/trash_lid.svg";
import trashDownPath from "../images/trash_basket.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; //  контекст
function Card(props) {
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `cards-grid__like-button ${
    isLiked && "cards-grid__like-button_active"
  }`;
  function handleClick() {
    props.onCardClick(props.card); //проброс в image popup
  }
  function handleLikeClick() {
    props.onCardLike(props.card); //проброс в image popup
  }
  //FIXME HANDLEDELETECLICK
  function handleDeleteClick() {
    props.onCardDelete(props.card); //проброс в image popup
  }
  return (
    <div className="cards-grid__item">
      {isOwn && (
        <button
          className="cards-grid__trash-button"
          onClick={handleDeleteClick}
        >
          <img className="cards-grid__trash-fimg" src={trashUpPath} />
          <img className="cards-grid__trash-simg" src={trashDownPath} />
        </button>
      )}
      <img
        className="cards-grid__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="cards-grid__underline">
        <h2 className="cards-grid__text">{props.card.name}</h2>
        <div className="cards-grid__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="cards-grid__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
