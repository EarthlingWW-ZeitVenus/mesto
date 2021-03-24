//ToDo: Вынести повторяющуюся логику методов в отдельную функцию +
//ToDo: Всю обработку catch вынести наружу

export default class Api {
  constructor(apiData) {
    this._url = apiData.url;
    this._cohortId = apiData.cohortId;
    this._token = apiData.token;
  }


//Обработка логики then
  _thenResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res);
  }

//Обработка логики catch
  // _catchResponse(err) {
  //   if(err.status) return Promise.reject(`Сервер ответил ошибкой со статусом ${err.status}`);
  //   return Promise.reject(`Ваш запрос не ушел на сервер или сервер не ответил, ошибка ${err}`);
  // }

//Получить массив карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      headers: {
        "authorization": this._token,
      }
    })
    .then(res => this._thenResponse(res));
  }

  //Добавление новой карточки на сервер
  addCard(cardName, cardLink) {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        "authorization": this._token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": cardName,
        "link": cardLink
      })
    })
    .then(res => this._thenResponse(res));
  }

  //Удаление карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "authorization": this._token,
      }
    })
    .then(res => this._thenResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this._url}/${this._cohortId}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        "authorization": this._token,
      }
    })
    .then(res => this._thenResponse(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/${this._cohortId}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        "authorization": this._token,
      }
    })
    .then(res => this._thenResponse(res));
  }

  //Получает с сервера информацию о пользователе
  getProfile() {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      headers: {
        "authorization": this._token,
        "content-type": "application/json"
      }
    })
    .then(res => this._thenResponse(res));
  }

  //Редактирует на сервере информацию о пользователе
  editProfile(profileName, profileAbout) {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        "authorization": this._token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": profileName,
        "about": profileAbout
      })
    })
    .then(res => this._thenResponse(res));
  }

  //Меняет иконку аватара пользователя
  changeAvatar(avatarUrl) {
    return fetch(`${this._url}/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "authorization": this._token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "avatar": avatarUrl
      })
    })
    .then(res => this._thenResponse(res));
  }

}