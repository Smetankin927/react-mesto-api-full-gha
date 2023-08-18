import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Login({ handleLogin, setUserEmail }) {
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
    Auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        handleLogin();
        localStorage.setItem("jwt", data.token);
        setUserEmail(formValue.email);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="registration">
      <div className="registration__container">
        <h2 className="registration__title">Вход</h2>
        <form
          className="registration__form"
          name="form2"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="registration__form-section">
            <input
              className="registration__input-text"
              value={formValue.email}
              onChange={handleChange}
              type="email"
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
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
