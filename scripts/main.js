//ToDo: Ужать картинки +
//ToDo: Удалить лишние тестовые модификаторы, оставить только те, что используются +
//ToDo: Удалить из index.css лишние ссылки +
//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +

//ToDo: Поудалять излишние объявленные переменные, которые нигде не используются +
//ToDo: Чеклист - Жесть... Надо было посмотреть его вначале...

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
const popupProfile = document.querySelector('.popup_theme_profile');
const popupPlace = document.querySelector('.popup_theme_place');
const popupImage = document.querySelector('.popup_theme_image');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
// const popup = document.querySelector('.popup');
let targetImage = undefined;
let targetElement = undefined;
let targetPopup = undefined;
// console.log(popupPlaceForm);

// console.log('Проверяем, что все попапы выбрались верно');
// console.log('popupProfile');
// console.log('popupPlace');
// console.log('popupImage');

// const popupContainer = popup.querySelector('.popup__container');
// const popupCloseButton = popup.querySelector('.popup__close-button');
// const popupForm = popup.querySelector('.popup__form');
// const popupTitle = popup.querySelector('.popup__title');
// const popupFirstInput = popup.querySelector('.popup__input:nth-child(1)');
// const popupSecondInput = popup.querySelector('.popup__input:nth-child(2)');

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

function definePopup() {
  let targetPopup = undefined;
  switch(true) {
    case(caseEditProfile):
      targetPopup = document.querySelector('.popup_theme_profile');
      popupToggle(targetPopup);
      break;
    case(caseAddPlace):
      targetPopup = document.querySelector('.popup_theme_place');
      popupToggle(targetPopup);
      break;
    case(caseShowImage):
      targetPopup = document.querySelector('.popup_theme_image');
      popupToggle(targetPopup);
  }
}

function preparePopup(targetPopup) {
  console.log(targetElement);
  // console.log(`Ссылка на картинку ${targetImage.src}`);
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
}


//Задает всплывающему окну нужные свойства и значения, в зависимости от нажатого элемента на странице
// function specializePopup(evt) {
//   const eventTarget = evt.target;
//   const eventTargetElement = evt.target.closest('.element');
//   if(caseEditProfile) {
//     popupTitle.textContent = 'Редактировать профиль';
//     popupForm.setAttribute('id', 'profile-info');
//     popupForm.setAttribute('name', 'profile-info');
//     popupFirstInput.setAttribute('id', 'full-name');
//     popupFirstInput.setAttribute('name', 'full-name');
//     popupFirstInput.classList.add('popup__input_field_full-name');
//     popupSecondInput.setAttribute('id', 'profession');
//     popupSecondInput.setAttribute('name', 'profession');
//     popupSecondInput.classList.add('popup__input_field_profession');
//     popupToggle();
//     if(casePopupOpened) {
//       popupFirstInput.value = docFullName.textContent;
//       popupSecondInput.value = docProfession.textContent;
//     }
    // console.log(popup.classList);
  // }
  // else if(caseAddPlace) {
  //   console.log(caseAddPlace);
  //   popupTitle.textContent = 'Новое место';
  //   popupForm.setAttribute('id', 'place-info');
  //   popupForm.setAttribute('name', 'place-info');
  //   popupFirstInput.setAttribute('id', 'place-title');
  //   popupFirstInput.setAttribute('name', 'place-title');
  //   popupFirstInput.classList.add('popup__input_field_place-title');
  //   popupFirstInput.setAttribute('placeholder', 'Название');
  //   popupSecondInput.setAttribute('id', 'link-to-image');
  //   popupSecondInput.setAttribute('name', 'link-to-image');
  //   popupSecondInput.classList.add('popup__input_field_link-to-image');
  //   popupSecondInput.setAttribute('placeholder', 'Ссылка на картинку');
  //   popupToggle();
    // console.log(popup.classList);
  // }
  // else if(caseShowImage) {
    // console.log(caseShowImage);
    // console.log(eventTarget.src);
    // console.log(eventTargetElement);
    // popupContainer.classList.add('popup__container_disabled');
    // popup.insertAdjacentHTML('afterbegin', `<figure class='popup__image-figure'><img class='popup__image'><figcaption class='popup__caption'></figcaption></figure>`);
    // popup.querySelector('.popup__image-figure').prepend(popupCloseButton);
    // console.log('Попап ниже должен содержать внутри себя класс popup__image-figure а кнопка popupCloseButton перемещена из Попап контейнера в попап фигуре имадж');
    // console.log(popup);
    // popup.querySelector('.popup__image').setAttribute('src', eventTarget.src);
    // popup.querySelector('.popup__caption').textContent = eventTargetElement.querySelector('.element__text').textContent;
    // console.log(popup.querySelector('.popup__image').src);
    // conole.log(popup.querySelector('.popup__caption').textContent);
    // popupToggle();
    // console.log(popup.classList);


//Закрытие и открытие любого всплывающего окна
function popupToggle(targetPopup) {
  targetPopup.classList.toggle('popup_opened');
  casePopupOpened = targetPopup.classList.contains('popup_opened');
  // console.log(targetPopup.classList);
  if(casePopupOpened)
    preparePopup(targetPopup);
  else
    setTimeout(makeAllToInitialState, 1000);
}


//Закрытия всплывающего окна по клику вне области окна
function popupClose (evt) {
  if(evt.target !== evt.currentTarget) return;
  // console.log(targetPopup);
  let targetPopup = evt.currentTarget;
  popupToggle(targetPopup);
}


//Сброс всех особенностей всплывающего окна до исходного состояния (значения не стал сбрасывать, они каждый раз и так переопределяются)
function makeAllToInitialState() {
  console.log('Убедимся что попали в функцию сброса в исходное состояния');
  if(!casePopupOpened) {
    if(caseEditProfile) {
      // console.log('Убедимся что попали в случай сброса класса - редактирование профиля');
      // popup.classList.remove('popup_functional_edit-profile');
      caseEditProfile = false;
    }
    else if(caseAddPlace) {
      // console.log('Убедимся что попали в случай сброса класса - добавление места');
      // popup.classList.remove('popup_functional_add-place');
      caseAddPlace = false;
    }
    else if(caseShowImage) {
      // console.log(popup.classList);
      // popupContainer.prepend(popupCloseButton);
      // console.log(popupContainer);
      // popup.classList.remove('popup_functional_show-image');
      caseShowImage = false;
      // console.log(popup.classList);
      // console.log(popup.querySelector('.popup__image-figure'));
      // popup.querySelector('.popup__image-figure').remove();
      // console.log(popup.querySelector('.popup__image-figure'));
      // console.log(popupContainer.classList);
      // popupContainer.classList.remove('popup__container_disabled');
      // console.log(popupContainer.classList);
    }
    popupProfileForm.reset();
    popupPlaceForm.reset();
    // console.log(popup);
    // console.log(popup.classList);
  }
}


//Производит действия при нажатии на кнопку "Сохранить"
function formSubmitHandler (evt) {
  evt.preventDefault();
  if(caseEditProfile) {
    docFullName.textContent = popupProfileForm.querySelector('.popup__input_field_full-name').value;
    docProfession.textContent = popupProfileForm.querySelector('.popup__input_field_profession').value;
    targetPopup = popupProfile;
  }
  else if(caseAddPlace) {
    const elementObject = {
      name: String(popupPlaceForm.querySelector('.popup__input_field_place-title').value),
      link: String(popupPlaceForm.querySelector('.popup__input_field_link-to-image').value),
    }
    addElementsToContainer(elementObject);
    targetPopup = popupPlace;
  }
  // console.log('Я попал сюда');
  popupToggle(targetPopup);
  return;
}


//Проверяет какой элемент нажат на странице и в зависимости от этого выполняет соответсвующие действия
document.addEventListener('click', evt => {
  // let targetPopup = undefined;
  switch(evt.target.classList[0]) {
    case 'profile__edit-button' :
      // targetPopup = evt.target.closest('.popup');
      caseEditProfile = evt.target.classList.contains('profile__edit-button');
      definePopup();
      // popup-profile.classList.add('popup-profile_opened');
      // caseEditProfile = popup.classList.contains('popup_functional_edit-profile');
      // specializePopup(evt);
      break;
    case 'profile__add-button' :
      // targetPopup = evt.target.closest('.popup');
      caseAddPlace = evt.target.classList.contains('profile__add-button');
      // popupPlace.classList.add('popup-place_opened');
      // caseAddPlace = evt.target.classList.contains('profile__add-button');
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
      console.log('Я попал в close-button');
      targetPopup = evt.target.closest('.popup');
      console.log(targetPopup);
      popupToggle(targetPopup);
      break;
    case 'element__image' :
      caseShowImage = evt.target.classList.contains('element__image');
      targetImage = evt.target;
      targetElement = evt.target.closest('.element');
      // targetPopup = evt.target.closest('.popup');
      console.log(targetElement);
      // console.log(`Проверяем, что в таргет попап не ноль ${targetPopup}`);
      // popup.classList.add('popup_functional_show-image');
      // caseShowImage = popup.classList.contains('popup_functional_show-image');
      console.log(caseShowImage);
      definePopup();
  };
})
  // switch(True) {
    // case(caseEditProfile):




  // }
  // if(caseEditProfile||caseAddPlace||caseShowImage) {
    // if(caseEditProfile) {
      // targetPopup = document.querySelector('.popup_theme_profile');
      // popupToggle(targetPopup);

      // targetPopup.querySelector('popup__input_field_full-name');
    // }
    // else if(caseAddPlace) {
      // targetPopup = document.querySelector('.popup_theme_place');
      // popupToggle(targetPopup);

    // }

  // }
    
    
    

    // popupToggle(targetPopup);
  // else if(evt.target.classList.contains('element__like'))
    // evt.target.classList.toggle('element__like_active');
  // else if(evt.target.classList.contains('element__delete'))
    // evt.target.closest('.element').remove();
// });



popupProfile.addEventListener('click', popupClose);
popupPlace.addEventListener('click', popupClose);
popupImage.addEventListener('click', popupClose);
popupProfileForm.addEventListener('submit', formSubmitHandler);
popupPlaceForm.addEventListener('submit', formSubmitHandler);