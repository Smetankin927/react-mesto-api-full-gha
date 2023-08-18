import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      //FIXME
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    //FIXME
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    //FIXME
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      children={
        <>
          <div className="popup__section">
            <input
              className="popup__input-text"
              type="text"
              name="first"
              value={name || ""}
              onChange={handleChangeName}
              placeholder="Ваше имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__input-error" id="profile-name-error">
              {" "}
            </span>
          </div>
          <div className="popup__section">
            <input
              className="popup__input-text"
              type="text"
              name="second"
              value={description || ""}
              onChange={handleChangeDescription}
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__input-error" id="profile-about-error">
              {" "}
            </span>
          </div>
        </>
      }
    />
  );
}

export default EditProfilePopup;
