import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={
        props.isOpen ? `popup popup_image popup_active` : `popup popup__image`
      }
    >
      <div className="popup__container-image">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__huge-image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__image-text">{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
