import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar:
        avatarRef.current
          .value /* Значение инпута, полученное с помощью рефа */, //FIXME
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__section">
            <input
              className="popup__input-text"
              ref={avatarRef}
              type="url"
              name="second"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error" id="place-url-error1">
              {" "}
            </span>
          </div>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
