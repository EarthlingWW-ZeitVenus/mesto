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

const imagePopup = new PopupWithImage(cardData.popupThemeImage);

//Обработчик "клика" по изображению карточки
const handleCardClick = (cardText, cardImage) => {
  imagePopup.open(cardText, cardImage);
};

const sectionRenderer = (item) => {
  const card = new Card(item, cardData, handleCardClick);
  sectionForRenderAll.addItem(card.generateCard());
};

//ToReview: Добавление карточки с картинкой из интернет происходит то нормально, то с ошибкой загрузки. Пошагово дебагером
// много раз проверил, проверил все значения, когда дебагером проверяю все нормально, все этапы выполняются и картинка
// грузится, когда подгружаю в обычном режиме, без дебагера, картинка не грузится, а в поле src картинки вместо url стоит
// unknown. Чего я только не пробовал... Голову уже сломал...  Грешу на глюки сервера и что его на каком-то этапе
// переклинивает, посмотрите у себя, может это только у меня такое происходит, а у вас нормально грузится будет...

const sectionForRenderAll = new Section({
  data: objectsArr,
  renderer: sectionRenderer
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
    const card = new Card(elementObject, cardData, handleCardClick);
    sectionForRenderAll.addItem(card.generateCard());
  }
});

//ToReview: Предварительное удаление сообщений об ошибках реализовал внутри метода enableValidation класса Validator,
//чтоб не переделывать приватный метод на побличный, но могу сделать публичным и вынести наружу...

//ToReview: Вы писали - Также в слушателе открытия формы карточки надо вызвать метод reset() формы, чтобы очистить
//все её поля ввода.

// - Так ведь у меня они очищаются при каждом закрытии формы-попапа (любым из методов закрытия), или надо ещё раз?

//Действия при нажатии на кнопку "Изменить" (Профиль)
function handleEditProfile () {
  // debugger;
  popupProfileFormFullName.value = userInfo.getUserInfo().docProfileFullname;
  popupProfileFormProfession.value = userInfo.getUserInfo().docProfileProfession;
  validatorForProfile.enableValidation();
  popupWithFormProfile.open();
}

//Действия при нажатии на кнопку "Добавить" (Место)
function handleAddPlace () {
  // debugger;
  validatorForPlace.enableValidation();
  popupWithFormPlace.open();
};

sectionForRenderAll.renderItems();

profileEditButton.addEventListener('click', handleEditProfile);
profileAddButton.addEventListener('click', handleAddPlace);