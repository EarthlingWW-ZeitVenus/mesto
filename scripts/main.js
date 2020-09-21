//ToDo: Ужать картинки +
//ToDo: Удалить лишние модификаторы, оставить только те, что используются +
//ToDo: Удалить из index.css лишние ссылки +
//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +
//ToDo: Поудалять излишние объявленные переменные, которые нигде не используются +
//ToDo: Чеклист +

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
const popupProfile = document.querySelector('.popup_theme_profile');
const popupPlace = document.querySelector('.popup_theme_place');
const popupImage = document.querySelector('.popup_theme_image');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupPlaceForm = popupPlace.querySelector('.popup__form');

//Переменные для указания в функциях какой конретно попап или элемент сейчас используется
let targetImage = undefined;
let targetElement = undefined;
let targetPopup = undefined;

const elementsArr = [
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
const elementsListContainer = document.querySelector('.elements__list');

// Для проверки условий и выполнения условных ветвлений в функциях
let caseEditProfile = false;
let caseAddPlace = false;
let casePopupOpened = false;
let caseShowImage = false;


// Добавление элементов в контейнер (либо в конце списка элементов, либо в начале)
const addElementsToContainer = elementObject => {
  const listElement = document.querySelector('#template-element').content.cloneNode(true);
  listElement.querySelector('.element__text').textContent = elementObject.name;
  listElement.querySelector('.element__image').setAttribute('src', elementObject.link);
  if(caseAddPlace) {
    elementsListContainer.prepend(listElement);
  }
  elementsListContainer.append(listElement);
}


elementsArr.forEach(addElementsToContainer);


//Сброс всех условий и переменных в начальное состояние
function makeAllToInitialState() {
  if(!casePopupOpened) {
    caseEditProfile = false;
    caseAddPlace = false;
    caseShowImage = false;
    targetImage = undefined;
    targetElement = undefined;
    targetPopup = undefined;
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


//Производит все необходимые действия и присваивания значений до открытия всплывающего окна
function preparePopup(targetPopup) {
  switch(true) {
    case(caseEditProfile):
      targetPopup.querySelector('.popup__input_field_full-name').value = docFullName.textContent;
      targetPopup.querySelector('.popup__input_field_profession').value = docProfession.textContent;
      break;
    case(caseAddPlace):
      targetPopup.querySelector('.popup__input_field_place-title').setAttribute('placeholder', 'Название');
      targetPopup.querySelector('.popup__input_field_link-to-image').setAttribute('placeholder', 'Ссылка на картинку');
      break;
    case(caseShowImage):
      targetPopup.querySelector('.popup__image').setAttribute('src', targetImage.src);
      targetPopup.querySelector('.popup__caption').textContent = targetElement.querySelector('.element__text').textContent;
  }
  togglePopup(targetPopup);
}


//Определяет какой кокретно попап будет открываться
function definePopup() {
  switch(true) {
    case(caseEditProfile):
      targetPopup = document.querySelector('.popup_theme_profile');
      break;
    case(caseAddPlace):
      targetPopup = document.querySelector('.popup_theme_place');
      break;
    case(caseShowImage):
      targetPopup = document.querySelector('.popup_theme_image');
  }
  preparePopup(targetPopup);
}


//Закрытия всплывающего окна по клику вне области окна
function closePopup (evt) {
  if(evt.target !== evt.currentTarget) return;
  targetPopup = evt.currentTarget;
  togglePopup(targetPopup);
}


//Производит действия при нажатии на кнопку "Сохранить"
function submitHandler (evt) {
  evt.preventDefault();
  if(caseEditProfile) {
    docFullName.textContent = popupProfileForm.querySelector('.popup__input_field_full-name').value;
    docProfession.textContent = popupProfileForm.querySelector('.popup__input_field_profession').value;
    targetPopup = popupProfile;
  }
  else if(caseAddPlace) {
    let elementObject = {
      name: String(popupPlaceForm.querySelector('.popup__input_field_place-title').value),
      link: String(popupPlaceForm.querySelector('.popup__input_field_link-to-image').value),
    }
    addElementsToContainer(elementObject);
    targetPopup = popupPlace;
  }
  togglePopup(targetPopup);
  return;
}


//Проверяет какой элемент нажат на странице и в зависимости от этого выполняет соответсвующие действия
document.addEventListener('click', evt => {
  switch(evt.target.classList[0]) {
    case 'profile__edit-button' :
      caseEditProfile = evt.target.classList.contains('profile__edit-button');
      definePopup();
      break;
    case 'profile__add-button' :
      caseAddPlace = evt.target.classList.contains('profile__add-button');
      console.log(caseAddPlace);
      definePopup();
      break;
    case 'element__like' :
      evt.target.classList.toggle('element__like_active');
      break;
    case 'element__delete' :
      evt.target.closest('.element').remove();
      break;
    case 'popup__close-button' :
      targetPopup = evt.target.closest('.popup');
      togglePopup(targetPopup);
      break;
    case 'element__image' :
      caseShowImage = evt.target.classList.contains('element__image');
      targetImage = evt.target;
      targetElement = evt.target.closest('.element');
      definePopup();
  };
})


popupProfile.addEventListener('click', closePopup);
popupPlace.addEventListener('click', closePopup);
popupImage.addEventListener('click', closePopup);
popupProfileForm.addEventListener('submit', submitHandler);
popupPlaceForm.addEventListener('submit', submitHandler);