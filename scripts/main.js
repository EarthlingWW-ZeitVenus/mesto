//ToDo: Ужать картинки +
//ToDo: Удалить лишние тестовые модификаторы, оставить только те, что используются +
//ToDo: Удалить из index.css лишние ссылки +
//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +
//ToDo: Чеклист

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const popupTitle = popup.querySelector('.popup__title');
const popupFirstInput = popup.querySelector('.popup__input:nth-child(1)');
const popupSecondInput = popup.querySelector('.popup__input:nth-child(2)');

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


//Задает всплывающему окну нужные свойства и значения, в зависимости от нажатого элемента на странице
function specializePopup(evt) {
  const eventTarget = evt.target;
  const eventTargetElement = evt.target.closest('.element');
  if(caseEditProfile) {
    popupTitle.textContent = 'Редактировать профиль';
    popupForm.setAttribute('id', 'profile-info');
    popupForm.setAttribute('name', 'profile-info');
    popupFirstInput.setAttribute('id', 'full-name');
    popupFirstInput.setAttribute('name', 'full-name');
    popupFirstInput.classList.add('popup__input_field_full-name');
    popupSecondInput.setAttribute('id', 'profession');
    popupSecondInput.setAttribute('name', 'profession');
    popupSecondInput.classList.add('popup__input_field_profession');
    popupToggle();
    if(casePopupOpened) {
      popupFirstInput.value = docFullName.textContent;
      popupSecondInput.value = docProfession.textContent;
    }
    // console.log(popup.classList);
  }
  else if(caseAddPlace) {
    // console.log(caseAddPlace);
    popupTitle.textContent = 'Новое место';
    popupForm.setAttribute('id', 'place-info');
    popupForm.setAttribute('name', 'place-info');
    popupFirstInput.setAttribute('id', 'place-title');
    popupFirstInput.setAttribute('name', 'place-title');
    popupFirstInput.classList.add('popup__input_field_place-title');
    popupFirstInput.setAttribute('placeholder', 'Название');
    popupSecondInput.setAttribute('id', 'link-to-image');
    popupSecondInput.setAttribute('name', 'link-to-image');
    popupSecondInput.classList.add('popup__input_field_link-to-image');
    popupSecondInput.setAttribute('placeholder', 'Ссылка на картинку');
    popupToggle();
    // console.log(popup.classList);
  }
  else if(caseShowImage) {
    // console.log(caseShowImage);
    // console.log(eventTarget.src);
    // console.log(eventTargetElement);
    popupContainer.classList.add('popup__container_disabled');
    popup.insertAdjacentHTML('afterbegin', `<figure class='popup__image-figure'><img class='popup__image'><figcaption class='popup__caption'></figcaption></figure>`);
    popup.querySelector('.popup__image-figure').prepend(popupCloseButton);
    // console.log('Попап ниже должен содержать внутри себя класс popup__image-figure а кнопка popupCloseButton перемещена из Попап контейнера в попап фигуре имадж');
    // console.log(popup);
    popup.querySelector('.popup__image').setAttribute('src', eventTarget.src);
    popup.querySelector('.popup__caption').textContent = eventTargetElement.querySelector('.element__text').textContent;
    // console.log(popup.querySelector('.popup__image').src);
    // conole.log(popup.querySelector('.popup__caption').textContent);
    popupToggle();
    // console.log(popup.classList);
  }
}


//Закрытие и открытие любого всплывающего окна
function popupToggle() {
  popup.classList.toggle('popup_opened');
  casePopupOpened = popup.classList.contains('popup_opened');
  console.log(popup.classList);
  if(!casePopupOpened)
    setTimeout(makeAllToInitialState, 1000);
  // console.log('Код исполняется дальше');
}


//Закрытия всплывающего окна по клику вне области окна
function popupClose (evt) {
  if(evt.target !== evt.currentTarget) return;
    popupToggle();
}


//Сброс всех особенностей всплывающего окна до исходного состояния (значения не стал сбрасывать, они каждый раз и так переопределяются)
function makeAllToInitialState() {
  // console.log('Убедимся что попали в функцию сброса в исходное состояния');
  if(!casePopupOpened) {
    if(caseEditProfile) {
      // console.log('Убедимся что попали в случай сброса класса - редактирование профиля');
      popup.classList.remove('popup_functional_edit-profile');
      caseEditProfile = popup.classList.contains('popup_functional_edit-profile');
    }
    else if(caseAddPlace) {
      // console.log('Убедимся что попали в случай сброса класса - добавление места');
      popup.classList.remove('popup_functional_add-place');
      caseAddPlace = popup.classList.contains('popup_functional_add-place');
    }
    else if(caseShowImage) {
      // console.log(popup.classList);
      popupContainer.prepend(popupCloseButton);
      // console.log(popupContainer);
      popup.classList.remove('popup_functional_show-image');
      caseShowImage = popup.classList.contains('popup_functional_show-image');
      // console.log(popup.classList);
      console.log(popup.querySelector('.popup__image-figure'));
      popup.querySelector('.popup__image-figure').remove();
      // console.log(popup.querySelector('.popup__image-figure'));
      // console.log(popupContainer.classList);
      popupContainer.classList.remove('popup__container_disabled');
      // console.log(popupContainer.classList);
    }
    popupForm.reset();
    // console.log(popup);
    // console.log(popup.classList);
  }
}


//Производит действия при нажатии на кнопку "Сохранить"
function formSubmitHandler (evt) {
  evt.preventDefault();
  if(caseEditProfile) {
    docFullName.textContent = popupFirstInput.value;
    docProfession.textContent = popupSecondInput.value;
  }
  else if(caseAddPlace) {
    const elementObject = {
      name: String(popupFirstInput.value),
      link: String(popupSecondInput.value),
    }
    addElementsToContainer(elementObject);
  }
  // console.log('Я попал сюда');
  popupToggle();
  return;
}


//Проверяет какой элемент нажат на странице и зависимости от этого "маркирует" всплывающее окно
document.addEventListener('click', evt => {
  switch(evt.target.classList[0]) {
    case 'profile__edit-button' :
      popup.classList.add('popup_functional_edit-profile');
      caseEditProfile = popup.classList.contains('popup_functional_edit-profile');
      specializePopup(evt);
      break;
    case 'profile__add-button' :
      popup.classList.add('popup_functional_add-place');
      caseAddPlace = popup.classList.contains('popup_functional_add-place');
      console.log(caseAddPlace);
      specializePopup(evt);
      break;
    case 'element__like' :
      evt.target.classList.toggle('element__like_active');
      break;
    case 'element__delete' :
      evt.target.closest('.element').remove();
      break;
    case 'popup__close-button' :
      console.log('Я попал в close-button');
      popupToggle();
      break;
    case 'element__image' :
      popup.classList.add('popup_functional_show-image');
      caseShowImage = popup.classList.contains('popup_functional_show-image');
      console.log(caseShowImage);
      specializePopup(evt);
  }
});


popup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);