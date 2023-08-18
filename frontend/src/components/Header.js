import React from "react";
import logoPath from "../images/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegClick = () => {
    navigate("/sign-up");
  };
  const handleLoginClick = () => {
    navigate("/sign-in");
  };

  let buttonName = "";
  let onClick = () => {};
  if (location.pathname === "/sign-in") {
    buttonName = "Зарегистрироваться";
    onClick = handleRegClick;
  } else if (location.pathname === "/sign-up") {
    buttonName = "Войти";
    onClick = handleLoginClick;
  } else {
    buttonName = "Выйти";
    onClick = props.handleSignOut;
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место" />
      <div className="header__data-button">
        <p className="header__emailPlace">{props.userEmail}</p>
        <button className="header__button" onClick={onClick}>
          {buttonName}
        </button>
      </div>
    </header>
  );
}

export default Header;
