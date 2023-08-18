import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; //  контекст
function Main(props) {
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст
  //изменили description about and name

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="фото"
          />
          <button
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__person">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__name-subline">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards-grid">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            link={item.link}
            name={item.name}
            likes={item.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            card={item} //для проброса в image popup
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
