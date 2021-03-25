//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +
//ToDo: Чеклист +
//ToDo: Проверить, что поиск элементов не повторяется +
//ToDo: Проверить, что объявления функций происходит до обращения к ним +
//ToDo: Почитать все комментарии, выполнить те пункты, которые я пометил на выполнение +
//ToDo: Везде, где используются промисы добавить catch +
//ToDo: Переделать приватные методы классов на публичные, если к ним пррисходит обращение в index.js и наоборот +
//ToDo: Удалить неиспользуемые компоненты их файла constatnts и ссылки на них в индексном файле +
//ToDo: Удалить массив изначальных данных, ссылки на него и используемые им переменные
//ToDo: В конце переделать под вебпак

//Note: Как переделать debug-версию под webpack-версию:
//1. В index.html перед закрывающим тегом body удалить строку подключающую главный файл скриптов
//2. Все ссылки на картинки в .js-файлах переделать на строки вида -
// const nameImage = new URL('./images/name-inamge.jpg', import.meta.url)
// - этот способ будет работать и без запуска Вебпака (как раз то, что мне нужно),
// затем импортировать созданные константы в нужные места
//3. Если в index.html есть теги img у которых присутствует атрибут src и прописан адрес до картинки, то привычный путь до
// картинки нужно заменить на такой <img src="<%=require('./images/logo.png')%>" alt="Логотип"> 
//4. Убрать из index.html тег link со ссылкой на стили, затем импортировать главный css-файл в index.js
// - import './styles/index.css' (набрать что-то наподобие этого в файле index.js)

import './index.css';

import { profileEditButton, profileAddButton, popupProfileFormFullName, popupProfileFormProfession,
  cardData, validatorData, popupData, apiData, profileAvatar } from '../utils/constants.js';

import Api from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api(apiData);
const imagePopup = new PopupWithImage(cardData.popupThemeImage);
const profileInfoApi = api.getProfile();
const objectsFromServerApi = api.getAllCards();
const userInfo = new UserInfo( {fullnameSelector:'.profile__full-name', professionSelector:'.profile__profession'} );
const validatorForProfile = new FormValidator(validatorData, document.forms.profileinfo);
const validatorForPlace = new FormValidator(validatorData, document.forms.placeinfo);

function catchResponse(err) {
  if(err.status) {
    alert(`Сервер ответил ошибкой со статусом ${err.status}`)
  }
  else {
    alert(`Ваш запрос не ушел на сервер или сервер не ответил, ошибка ${err}`)
  };
};

function createCard(item) {
  const card = new Card(item, cardData, callbacksForCard, userInfo.getUserInfo().profileId);
  return card.generateCard();
};

const section = new Section({
  data: undefined,
  renderer: undefined
  },
  cardData.containerSelector
);

const popupWithFormProfile = new PopupWithForm(popupData.popupProfile, {
  formSubmitHandler: (formInputs, thisObject) => {
    popupWithFormProfile.renderLoading(true, "Сохранение...");
    const editProfileApi = api.editProfile(formInputs.name, formInputs.about);
    editProfileApi
    .then(res => {
      userInfo.setUserInfo(res);
      thisObject.close();
    })
    .catch(error => catchResponse(error))
    .finally(() => {
      popupWithFormProfile.renderLoading(false);
    });
  }
});

const popupWithFormPlace = new PopupWithForm(popupData.popupPlace, {
  formSubmitHandler: (formInputs, thisObject) => {
    popupWithFormPlace.renderLoading(true, "Сохранение...");
    api.addCard(formInputs.placetitle, formInputs.linktoimage)
    .then(res => {
      section.addItem(createCard(res));
      thisObject.close();
    })
    .catch(error => catchResponse(error))
    .finally(() => {
      popupWithFormPlace.renderLoading(false);
    });
  }
});

const popupWithFormDelete = new PopupWithForm(popupData.popupDelete, {});

const popupWithFormAvatar = new PopupWithForm(popupData.popupAvatar, {
  formSubmitHandler: (inputValues, thisObject) => {
    popupWithFormAvatar.renderLoading(true, "Сохранение...");
    api.changeAvatar(inputValues.linktoavatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      thisObject.close();
    })
    .catch(error => catchResponse(error))
    .finally(() => {
      popupWithFormAvatar.renderLoading(false);
    });
  }
});

//Объект содержащий колбеки для экземпляров класса Card
const callbacksForCard = {
  handleDeleteCard: (thisCardObject) => {
    popupWithFormDelete.setSubmitHandler(() => {
      api.deleteCard(thisCardObject.getCardInfo().cardId)
      .then(() => {
        thisCardObject.removeCard();
        popupWithFormDelete.close();
      })
      .catch(error => catchResponse(error));
    });
    popupWithFormDelete.open();
  },
  handleImageOpen: (cardText, cardImage) => {
    imagePopup.open(cardText, cardImage);
  },
  handleLikeStatus: (thisCardObject) => {
    if(thisCardObject.getCardInfo().haveUserLike) {
      api.deleteLike(thisCardObject.getCardInfo().cardId)
      .then((res) => {
        thisCardObject.removeLike(res.likes.length);
      })
      .catch(error => catchResponse(error));
    }
    else {
      api.addLike(thisCardObject.getCardInfo().cardId)
      .then((res) => {
        thisCardObject.addLike(res.likes.length);
      })
      .catch(error => catchResponse(error));
    }
  }  
}


//Получение всех данных с сервера, необходимых для начальной загрузки страницы
Promise.all( [profileInfoApi, objectsFromServerApi] )
  .then((results) => {
    //Обработка первого элемента данных из массива данных, полученных от сервера
    userInfo.setUserInfo(results[0]);
    //Обработка второго элемента данных из массива данных, полученных от сервера
    results[1].forEach(item => section.addItem(createCard(item)));
  })
  .catch(error => catchResponse(error));

//Действия при нажатии на кнопку "Изменить" (Профиль)
function handleEditProfile() {
  popupProfileFormFullName.value = userInfo.getUserInfo().profileFullname;
  popupProfileFormProfession.value = userInfo.getUserInfo().profileProfession;
  validatorForProfile.intialValidation();
  popupWithFormProfile.open();
};

//Действия при нажатии на кнопку "Добавить" (Место)
function handleAddPlace() {
  validatorForPlace.intialValidation();
  popupWithFormPlace.open();
};

//Действия при нажатии на иконку с аватаром
function handleEditAvatar() {
  popupWithFormAvatar.open();
};


validatorForProfile.enableValidation();
validatorForPlace.enableValidation();
imagePopup.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormPlace.setEventListeners();
popupWithFormDelete.setEventListeners();
popupWithFormAvatar.setEventListeners();
profileEditButton.addEventListener('click', handleEditProfile);
profileAddButton.addEventListener('click', handleAddPlace);
profileAvatar.addEventListener('click', handleEditAvatar);