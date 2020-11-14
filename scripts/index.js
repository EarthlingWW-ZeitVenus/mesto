//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +
//ToDo: Чеклист +
//ToDo: Проверить, что поиск элементов не повторяется +
//ToDo: Проверить, что объявления функций происходит до обращения к ним +

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// console.log(Card);
// console.log(FormValidator);

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
const popupProfile = document.querySelector('.popup_theme_profile');
const popupPlace = document.querySelector('.popup_theme_place');
export const popupElement = document.querySelector('.popup_theme_image');
const popupProfileForm = document.forms.profileinfo;
const popupPlaceForm = document.forms.placeinfo;
const popupProfileFormFullName = popupProfileForm.elements.fullname;
const popupProfileFormProfession = popupProfileForm.elements.profession;
const popupPlaceFormTitle = popupPlaceForm.elements.placetitle;
const popupPlaceFormLinkToImage = popupPlaceForm.elements.linktoimage;
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
// export const popupElementImage = popupElement.querySelector('.popup__image');
// export const popupElementCaption = popupElement.querySelector('.popup__caption');
const popupElementImageCloseButton = popupElement.querySelector('.popup__close-button');
const elementsListContainer = document.querySelector('.elements__list');

const objectsArr = [
  {
      name: 'Дельфины',
      link: 'images/Dolphins.jpg',
      alt: 'два дельфина плывут по голубой воде'
  },
  {
      name: 'Рыба молот',
      link: 'images/Hammerhead-fish.jpg',
      alt: 'рыба-молот, вид спереди, на глубине, под водой'
  },
  {
      name: 'Медузы',
      link: 'images/Jelly-fish.jpg',
      alt: 'стая медуз под водой'
  },
  {
      name: 'Морская черепаха',
      link: 'images/Sea-turtle.jpg',
      alt: 'морская черепаха плывет под водой'
  },
  {
      name: 'Береговая линия',
      link: 'images/Shoreline.jpg',
      alt: 'береговая линия, рядом очертания берега, грота и морского прилива, вдали очертания мыса и кусок скалы'
  },
  {
      name: 'Стая акул',
      link: 'images/Snorkel-trip.jpg',
      alt: 'Стая акул плывет под водой'
  }
];

//Объект настроек класса Card
export const cardData = {
  templateSelector: '#template-element',
  imageSelector: '.element__image',
  deleteButtonSelector: '.element__delete',
  likeButtonSelector: '.element__like',
  textSelector: '.element__text',
  templateElement: '.element',
  elementLikeActive: 'element__like_active',
  popupThemeImage: '.popup_theme_image',
  popupElementImage: '.popup__image',
  popupImageCaption: '.popup__caption',
  // functionOpenPopup: functionToObjectProperty()
}

//Объект настроек класса validatorData
const validatorData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//Для создания элемента-карточки с нужными атрибутами
// function makeElement(elementObject) {
//   const listElement = document.querySelector('#template-element').content.cloneNode(true);
//   const elementImage = listElement.querySelector('.element__image');
//   listElement.querySelector('.element__text').textContent = elementObject.name;
//   elementImage.alt = elementObject.alt || elementObject.name;
//   elementImage.setAttribute('src', elementObject.link);
//   const elementLikeButton = listElement.querySelector('.element__like');
//   const elementDeleteButton = listElement.querySelector('.element__delete');
//   elementLikeButton.addEventListener('click', handleLikeStatus);
//   elementDeleteButton.addEventListener('click', handleDeleteElement);
//   elementImage.addEventListener('click', handleOpenImage);
//   return listElement;
// }


//Создание массива элеметов-карточек
//const elementsArr = objectsArr.map(makeElement);
const elementsArr = objectsArr.map((item) => {
  const card = new Card(item, cardData);

  // console.log(card.generateCard());
  return card.generateCard();
});


//Добавление всех элементов-карточек из массива в DOM
elementsArr.forEach(arrItem => {
  elementsListContainer.append(arrItem);
});


//Добавление нового элемента-карточки
const addElement = newElement => {
  // newItem._setEventListeners();
  elementsListContainer.prepend(newElement);
};


//Открытие всплывающего окна
export function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyEscapeKeydown);
}


//Закрытие всплывающего окна
function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyEscapeKeydown);
}


//Закрытия всплывающего окна по клику вне области окна
function closePopupByClickOverlay(evt) {
  if(evt.target !== evt.currentTarget) return;
  closePopup(evt.currentTarget);
}


//Действия при нажатии на кнопку "Сохранить" (Редактирование профиля)
function submitEditProfile(evt) {
  evt.preventDefault();
  docFullName.textContent = popupProfileFormFullName.value;
  docProfession.textContent = popupProfileFormProfession.value;
  closePopup(popupProfile);
}


//Действия при нажатии на кнопку "Сохранить" (Добавление места)
function submitAddPlace(evt) {
  evt.preventDefault();
  const elementObject = {
    name: String(popupPlaceFormTitle.value),
    link: String(popupPlaceFormLinkToImage.value),
  }
  const card = new Card(elementObject, cardData);
  // const newElement = makeElement(elementObject);
  // newElement = card.generateCard();
  addElement(card.generateCard());
  closePopup(popupPlace);
}


//Удаление элемента-карточки
// function handleDeleteElement(evt) {
//   evt.target.closest('.element').remove();
// }


//Поставить "лайк"
// function handleLikeStatus(evt) {
//   evt.target.classList.toggle('element__like_active');
// }


//Действия при нажатии на кнопку "Esc"
function handleKeyEscapeKeydown (evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


//Действия при нажатии на кнопку "Изменить" (Профиль)
function handleEditProfile () {
  popupProfileFormFullName.value = docFullName.textContent;
  popupProfileFormProfession.value = docProfession.textContent;
  const validator = new FormValidator(validatorData, document.forms.profileinfo);
  validator.enableValidation();
  openPopup(popupProfile);
}

// console.log(document.forms.placeinfo);

//Действия при нажатии на кнопку "Добавить" (Место)
function handleAddPlace () {
  // const inputList = Array.from(popupPlaceForm.querySelectorAll('.popup__input'));
  // const buttonElement = popupPlaceForm.querySelector('.popup__submit-button');
  const validator = new FormValidator(validatorData, document.forms.placeinfo);
  validator.enableValidation();
  // validator._toggleButtonState(inputList, buttonElement, validatorData);
  // debugger;
  openPopup(popupPlace);
}


//Действия при нажатии на картинку карточки
// function handleOpenImage (evt) {
//   const targetImage = evt.target;
//   const targetElement = evt.target.closest('.element');
//   popupElementImage.setAttribute('src', targetImage.src);
//   popupElementCaption.textContent = targetElement.querySelector('.element__text').textContent;
//   openPopup(popupElement);
// }


//Закрытие попап при клике на крестик (Профиль)
function handleCloseProfile() {
  closePopup(popupProfile);
  popupProfileForm.reset();
}


//Закрытие попап при клике на крестик (Место)
function handleClosePlace() {
  closePopup(popupPlace);
  popupPlaceForm.reset();
}


//Закрытие попап при клике на крестик (Картинка)
function handleCloseImage() {
  closePopup(popupElement);
}


profileEditButton.addEventListener('click', handleEditProfile);
profileAddButton.addEventListener('click', handleAddPlace);
popupProfileCloseButton.addEventListener('click', handleCloseProfile);
popupPlaceCloseButton.addEventListener('click', handleClosePlace);
popupElementImageCloseButton.addEventListener('click', handleCloseImage);
popupProfile.addEventListener('click', closePopupByClickOverlay);
popupPlace.addEventListener('click', closePopupByClickOverlay);
popupElement.addEventListener('click', closePopupByClickOverlay);
popupProfileForm.addEventListener('submit', submitEditProfile);
popupPlaceForm.addEventListener('submit', submitAddPlace);