import React from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
//
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";
import * as Auth from "../utils/Auth";

//
import "../index.css";
export const App = () => {
  const [userEmail, setUserEmail] = React.useState("");
  const changeUserEmail = (mail) => {
    setUserEmail(mail);
  };
  //для авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setLoggedIn(true);
          setUserEmail(data.data.email); //fixed
          navigate(location.pathname);
        })
        .catch((e) => {
          console.log(e);
          setLoggedIn(false);
        });
    }
  };
  React.useEffect(() => {
    checkToken();
  }, []);

  const [isEditProfilePopupOpen, toggleEditProfileClick] =
    React.useState(false);
  const [isEditAvatarPopupOpen, toggleEditAvatarClick] = React.useState(false);
  const [isAddPlacePopupOpen, toggleAddPlaceClick] = React.useState(false);
  const [isImagePopupOpen, toggleImagePopupState] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isSuccessInfoTooltipStatus, setSuccessInfoTooltipStatus] =
    React.useState(false);

  //картинка карточки
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  //функции обработчиков
  const closeAllPopups = () => {
    if (isEditProfilePopupOpen) {
      toggleEditProfileClick(false);
    }
    if (isEditAvatarPopupOpen) {
      toggleEditAvatarClick(false);
    }
    if (isAddPlacePopupOpen) {
      toggleAddPlaceClick(false);
    }
    if (isImagePopupOpen) {
      toggleImagePopupState(false);
    }
    if (isInfoTooltipOpen) {
      setInfoTooltipOpen(false);
    }
    setSelectedCard({ name: "", link: "" });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    if (card.link) {
      //добавил проверку link-непустой перед открытием
      toggleImagePopupState(true);
    }
  };

  const handleEditProfileClick = () => {
    if (!isEditProfilePopupOpen) {
      toggleEditProfileClick(true);
    }
  };
  const handleEditAvatarClick = () => {
    if (!isEditAvatarPopupOpen) {
      toggleEditAvatarClick(true);
    }
  };
  const handleAddPlaceClick = () => {
    if (!isAddPlacePopupOpen) {
      toggleAddPlaceClick(true);
    }
  };

  //импорт контекста CurrentUserContext

  const [currentUser, setCurrentUser] = React.useState({}); //added

  //api для currentUser?
  React.useEffect(() => {
    if (loggedIn) {
      console.log("appjs compon");
      api
        .takeUserInfo()
        // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
    return () => {};
  }, [loggedIn]);

  function handleUpdateUser(data) {
    console.log("appjs comp update");
    api
      .updateProfileInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  function handleUpdateAvatar(link) {
    api
      .updateAvatar(link.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  //стейт карточки
  const [cards, setCards] = React.useState([]);
  //api
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
        .then((cardsData) => {
          //пополняем массив cards
          setCards(cardsData);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
    return () => {};
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardDelete(card) {
    //FIXME
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id != card._id));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .postNewCard(newCard)
      .then((item) => {
        setCards([item, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function setIsInfoTooltipOpen(flag) {
    setInfoTooltipOpen(flag);
  }
  function setIsSuccessInfoTooltipStatus(flag) {
    setSuccessInfoTooltipStatus(flag);
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    changeUserEmail("");
    navigate("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          handleSignOut={handleSignOut}
          handleClick
        />
        <Routes>
          <Route
            path="/*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={() => {
                  setLoggedIn(true);
                }}
                setUserEmail={changeUserEmail}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                setIsSuccessInfoTooltipStatus={setIsSuccessInfoTooltipStatus}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
              />
            }
          />
        </Routes>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delCard"
          title="Хорошо подумал?"
          onClose={closeAllPopups}
          children={<></>}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSucces={isSuccessInfoTooltipStatus}
          onClose={closeAllPopups}
        />
        <Footer />
        <script type="module" src="./index.js"></script>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
