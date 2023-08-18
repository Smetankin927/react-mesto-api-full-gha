// duckAuth.js

export const BASE_URL = "http://api.monkey.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`ошибка:${res.status}`)
    )
    .catch((err) => console.log(err));
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`ошибка:${res.status}`)
    )
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`ошибка:${res.status}`)
    )
    .catch((err) => console.log(err));
};
