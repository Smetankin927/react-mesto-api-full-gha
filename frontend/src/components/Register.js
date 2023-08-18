import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";
function Register(props) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.register(formValue.password, formValue.email)
      .then((data) => {
        //console.log("DATE")
        console.log(data.error);
        props.setIsSuccessInfoTooltipStatus(true);
        props.setIsInfoTooltipOpen(true);
        //OPEN MODAL WINDOW
      })
      .then(() => {
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log("ПРОБЛЕМА РЕГИСТРАЦИИ");
        props.setIsSuccessInfoTooltipStatus(false);
        props.setIsInfoTooltipOpen(true);
      }); //OPEN MODAL WINDOW
  };

  const handleSignInClick = () => {
    navigate("/sign-in");
  };

  return (
    <section className="registration">
      <div className="registration__container">
        <h2 className="registration__title">Регистрация</h2>
        <form
          className="registration__form"
          name="form2"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="registration__form-section">
            <input
              className="registration__input-text"
              type="email"
              value={formValue.email}
              onChange={handleChange}
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="registration__input-error" id="place-email-error">
              {" "}
            </span>
          </div>

          <div className="registration__form-section">
            <input
              className="registration__input-text"
              type="password"
              value={formValue.password}
              onChange={handleChange}
              name="password"
              placeholder="Пароль"
              required
            />
            <span
              className="registration__input-error"
              id="place-password-error"
            >
              {" "}
            </span>
          </div>

          <button className="registration__button-save" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="registration__down-buttons">
          <button className="registration__button-login" type="button">
            Забыли пароль?
          </button>
          <button
            className="registration__button-login"
            type="button"
            onClick={handleSignInClick}
          >
            Войти
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
