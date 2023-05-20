import { API } from "./backend";

export const getQuestion = (id) => {
  return fetch(`${API}/question/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchQuestion = (title) => {
  return fetch(`${API}/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchQuestionByGroup = (title) => {
  return fetch(`${API}/group/${title}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
