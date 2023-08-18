import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={
        props.isOpen
          ? `popup popup_${props.name} popup_active`
          : `popup popup_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__input"
          name="form1"
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button className="popup__button-save" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
