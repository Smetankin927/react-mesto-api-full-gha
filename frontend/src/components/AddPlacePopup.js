import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
  const [placeLink, setLinkPlace] = React.useState("");
  const [placeName, setPlaceName] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateCards({
      name: placeName,
      link: placeLink,
    });
  }
  React.useEffect(() => {
    setPlaceName("");
    setLinkPlace("");
  }, [props.isOpen]);

  function handleChangeName(e) {
    setPlaceName(e.target.value);
  }
  function handleChangeLink(e) {
    setLinkPlace(e.target.value);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__section">
            <input
              className="popup__input-text"
              type="text"
              name="first"
              value={placeName}
              onChange={handleChangeName}
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__input-error" id="place-name-error">
              {" "}
            </span>
          </div>
          <div className="popup__section">
            <input
              className="popup__input-text"
              value={placeLink}
              onChange={handleChangeLink}
              type="url"
              name="second"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error" id="place-url-error">
              {" "}
            </span>
          </div>
        </>
      }
    />
  );
}

export default AddPlacePopup;
