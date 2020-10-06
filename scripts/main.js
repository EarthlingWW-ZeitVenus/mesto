//ToDo: Ужать картинки +
//ToDo: Удалить лишние модификаторы, оставить только те, что используются +
//ToDo: Удалить из index.css лишние ссылки +
//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +
//ToDo: Поудалять излишние объявленные переменные, которые нигде не используются +
//ToDo: Чеклист +
//ToDo: Проверить, что поиск элементов не повторяется +
//ToDo: Проверить, что объявления функций происходит до обращения к ним +

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
const popupProfile = document.querySelector('.popup_theme_profile');
const popupPlace = document.querySelector('.popup_theme_place');
const popupElement = document.querySelector('.popup_theme_image');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupProfileFormFullName = popupProfileForm.querySelector('.popup__input_field_full-name');
const popupProfileFormProfession = popupProfileForm.querySelector('.popup__input_field_profession');
const popupPlaceFormTitle = popupPlaceForm.querySelector('.popup__input_field_place-title');
const popupPlaceFormLinkToImage = popupPlaceForm.querySelector('.popup__input_field_link-to-image');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupElementImage = popupElement.querySelector('.popup__image');
const popupElementCaption = popupElement.querySelector('.popup__caption');
const popupElementImageCloseButton = popupElement.querySelector('.popup__close-button');
const elementsListContainer = document.querySelector('.elements__list');

const objectsArr = [
  {
      name: 'Дельфины',
      link: 'images/Dolphins.jpg'
  },
  {
      name: 'Рыба молот',
      link: 'images/Hammerhead-fish.jpg'
  },
  {
      name: 'Медузы',
      link: 'images/Jelly-fish.jpg'
  },
  {
      name: 'Морская черепаха',
      link: 'images/Sea-turtle.jpg'
  },
  {
      name: 'Береговая линия',
      link: 'images/Shoreline.jpg'
  },
  {
      name: 'Стая акул',
      link: 'images/Snorkel-trip.jpg'
  }
];


// Для проверки условий и выполнения условных ветвлений в функциях
let casePopupOpened = false;
let makeElementCounter = 0;


//Для создания элемента-карточки с нужными атрибутами
function makeElement(elementObject) {
  const listElement = document.querySelector('#template-element').content.cloneNode(true);
  elementImageButton = listElement.querySelector('.element__image');
  listElement.querySelector('.element__text').textContent = elementObject.name;
  if (makeElementCounter < 6) {
    switch(elementObject.name) {
      case('Дельфины'):
        elementImageButton.alt = 'два дельфина плывут по голубой воде';
        break;
      case('Рыба молот'):
        elementImageButton.alt = 'рыба-молот, вид спереди, на глубине, под водой';
        break;
      case('Медузы'):
        elementImageButton.alt = 'стая медуз под водой';
        break;
      case('Морская черепаха'):
        elementImageButton.alt = 'морская черепаха плывет под водой';
        break;
      case('Береговая линия'):
        elementImageButton.alt = 'береговая линия, рядом очертания берега, грота и морского прилива, вдали очертания мыса и кусок скалы';
        break;
      case('Стая акул'):
        elementImageButton.alt = 'Стая акул плывет под водой';
    };
  }
  elementImageButton.setAttribute('src', elementObject.link);
  elementLikeButton = listElement.querySelector('.element__like');
  elementDeleteButton = listElement.querySelector('.element__delete');
  elementLikeButton.addEventListener('click', handleLikeStatus);
  elementDeleteButton.addEventListener('click', handleDeleteElement);
  elementImageButton.addEventListener('click', handleOpenImage);
  makeElementCounter += 1;
  return listElement;
}


//Создание массива элеметов-карточек с нужными атрибутами
const elementsArr = objectsArr.map(makeElement);


//Добавление всех элементов-карточек из массива в DOM
elementsArr.forEach(arrItem => {
  elementsListContainer.append(arrItem);
});


//Добавление нового элемента-карточки
const addElement = newElement => {
  elementsListContainer.prepend(newElement);
};


// Сброс всех условий и переменных в начальное состояние
function makeAllToInitialState() {
  if(!casePopupOpened) {
    popupProfileForm.reset();
    popupPlaceForm.reset();
  }
}


//Закрытие и открытие текущего всплывающего окна
function togglePopup(targetPopup) {
  targetPopup.classList.toggle('popup_opened');
  casePopupOpened = targetPopup.classList.contains('popup_opened');
  if(!casePopupOpened)
    setTimeout(makeAllToInitialState, 1000);
}


//Закрытия всплывающего окна по клику вне области окна
function closePopup (evt) {
  if(evt.target !== evt.currentTarget) return;
  let targetPopup = evt.currentTarget;
  togglePopup(targetPopup);
}


//Действия при нажатии на кнопку "Сохранить" (Редактирование профиля)
function submitEditProfile(evt) {
  evt.preventDefault();
  docFullName.textContent = popupProfileFormFullName.value;
  docProfession.textContent = popupProfileFormProfession.value;
  togglePopup(popupProfile);
}


//Действия при нажатии на кнопку "Сохранить" (Добавление места)
function submitAddPlace(evt) {
  evt.preventDefault();
  let elementObject = {
    name: String(popupPlaceFormTitle.value),
    link: String(popupPlaceFormLinkToImage.value),
  }
  let newElement = makeElement(elementObject);
  addElement(newElement);
  togglePopup(popupPlace);
}


//Удаление элемента-карточки
function handleDeleteElement(evt) {
  evt.target.closest('.element').remove();
}


//Поставить "лайк"
function handleLikeStatus(evt) {
  evt.target.classList.toggle('element__like_active');
}


//Действия при нажатии на кнопку "Изменить" (Профиль)
function handleEditProfile () {
  popupProfileFormFullName.value = docFullName.textContent;
  popupProfileFormProfession.value = docProfession.textContent;
  togglePopup(popupProfile);
}


//Действия при нажатии на кнопку "Добавить" (Место)
function handleAddPlace () {
  // console.log('Проверяем, что я попал в функцию-обработчик добавления "места"');
  // caseAddPlace = evt.target.classList.contains('profile__add-button');
  // popupPlaceFormTitle.setAttribute('placeholder', 'Название');
  // popupPlaceFormLinkToImage.setAttribute('placeholder', 'Ссылка на картинку');
  togglePopup(popupPlace);
}


//Действия при нажатии на картинку карточки
function handleOpenImage (evt) {
  let targetImage = evt.target;
  let targetElement = evt.target.closest('.element');
  popupElementImage.setAttribute('src', targetImage.src);
  popupElementCaption.textContent = targetElement.querySelector('.element__text').textContent;
  togglePopup(popupElement);
}


//Закрытие попап при клике на крестик (Профиль)
function handleCloseProfile() {
  togglePopup(popupProfile);
}


//Закрытие попап при клике на крестик (Место)
function handleClosePlace() {
  togglePopup(popupPlace);
}


//Закрытие попап при клике на крестик (Картинка)
function handleCloseImage() {
  togglePopup(popupElement);
}


profileEditButton.addEventListener('click', handleEditProfile);
profileAddButton.addEventListener('click', handleAddPlace);
popupProfileCloseButton.addEventListener('click', handleCloseProfile);
popupPlaceCloseButton.addEventListener('click', handleClosePlace);
popupElementImageCloseButton.addEventListener('click', handleCloseImage);
popupProfile.addEventListener('click', closePopup);
popupPlace.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopup);
popupProfileForm.addEventListener('submit', submitEditProfile);
popupPlaceForm.addEventListener('submit', submitAddPlace);