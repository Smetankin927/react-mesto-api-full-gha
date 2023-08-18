class Api {
  constructor(options) {
    // тело конструктора
    this._url = options.baseUrl;
    this._headers = options.headers;
    // this._cohortId = "cohort-65";
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  updateProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data), //обновленные данные
    }).then(this._checkResponse);
  }

  updateAvatar(newlink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newlink,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: "include",

      headers: this._headers,
    }).then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      credentials: "include",

      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  takeUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: "include",

      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      credentials: "include",

      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      credentials: "include",

      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      credentials: "include",

      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    //let result = 0;
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId);
    }
  }
}

//api
export const api = new Api({
  baseUrl: "http://localhost:3000",
  //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    //authorization: "5b779ce5-67ec-4158-af6f-f7e8e8864a40",
    "Content-Type": "application/json",
  },
});
