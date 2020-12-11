//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +
//ToDo: Чеклист +
//ToDo: Проверить, что поиск элементов не повторяется +
//ToDo: Проверить, что объявления функций происходит до обращения к ним +
//ToDo: Почитать все комментарии, выполнить те пункты, которые я пометил на выполнение +
//ToDo: Создать требуемую структуру папок для файлов-скриптов и переделать пути импортов, в соответствии с структурой +
//ToDo: Переделать экспорт на default +

import './index.css';

import { profileEditButton, profileAddButton, popupProfileFormFullName, popupProfileFormProfession,
  elementObject, objectsArr, cardData, validatorData, popupData } from '../utils/constants.js';


import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


//Обработчик "клика" по изображению карточки
const handleCardClick = (evt) => {
  const imagePopup = new PopupWithImage(cardData.popupThemeImage);
  imagePopup.open(evt);
};

//В зависимости от типа принятых данных (массив или объект) создает либо массив объектов карточек, либо один объект
// карточку, наполняет данными, возвращает разметку и вставляет в DOM, посредством объекта экземпляра класса Section
const elementsRenderer = (objectOrArray) => {
  if (Array.isArray(objectOrArray)) {
    objectOrArray.forEach(item => {
      const card = new Card(item, cardData, handleCardClick);
      sectionForArray.addItem(card.generateCard());
    });
  }
  else {
    const card = new Card(objectOrArray, cardData, handleCardClick);
    sectionForElement.addItem(card.generateCard());
  }
};

const sectionForArray = new Section({
  data: objectsArr,
  renderer: elementsRenderer
  },
  cardData.containerSelector
);

const sectionForElement = new Section({
  data: elementObject,
  renderer: elementsRenderer
  },
  cardData.containerSelector
);

const validatorForProfile = new FormValidator(validatorData, document.forms.profileinfo);
const validatorForPlace = new FormValidator(validatorData, document.forms.placeinfo);
const userInfo = new UserInfo( {fullnameSelector:'.profile__full-name', professionSelector:'.profile__profession'} );

const popupWithFormProfile = new PopupWithForm(popupData.popupProfile, {
  formSubmitHandler: (formInputs) => {
    userInfo.setUserInfo(formInputs.fullname, formInputs.profession);
  }
});

const popupWithFormPlace = new PopupWithForm(popupData.popupPlace, {
  formSubmitHandler: (formInputs) => {
    elementObject.name = String(formInputs.placetitle);
    elementObject.link = String(formInputs.linktoimage);
    elementsRenderer(elementObject); 
  }
});

//Действия при нажатии на кнопку "Изменить" (Профиль)
function handleEditProfile () {
  popupProfileFormFullName.value = userInfo.getUserInfo().docProfileFullname;
  popupProfileFormProfession.value = userInfo.getUserInfo().docProfileProfession;
  validatorForProfile.enableValidation();
  popupWithFormProfile.open();
}

//Действия при нажатии на кнопку "Добавить" (Место)
function handleAddPlace () {
  validatorForPlace.enableValidation();
  popupWithFormPlace.open();
};

sectionForArray.renderItems();

profileEditButton.addEventListener('click', handleEditProfile);
profileAddButton.addEventListener('click', handleAddPlace);