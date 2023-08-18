import React from "react";
import succesRegImgPath from "../images/Union(2).svg";
import failRegImgPath from "../images/Union(1).svg";

function InfoTooltip(props) {
  const succesMessage = "Вы успешно Зарегистрировались";
  const failMessage = "Что-то пошло не так. Попробуйте еще раз";
  return (
    <section
      className={
        props.isOpen
          ? `popup popup__registration popup_active`
          : `popup popup__registration`
      }
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__registration-image"
          src={props.isSucces ? succesRegImgPath : failRegImgPath}
          alt="подтверждение"
        />
        <h2 className="popup__title popup__title-registration">
          {props.isSucces ? succesMessage : failMessage}{" "}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
