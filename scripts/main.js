const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// ToReview: шаблонный элемент "нашел" дважды (в глобальной области видимсости и в функции addElementsToContainer)
// и присвоил найденное разным переменным. Если оперировать одной и той-же переменной, то выводится неправильная
// картина, пока до конца не понял почему, но думаю это из-за того, что глобальная переменная и та, что в функции
// влияют друг на друга при каждой итерации в функции, поэтому решил их разделить.
// const templateElement = document.querySelector('#template-element').content.cloneNode(true);
// const likeButton = templateElement.querySelector('.element__like');
// console.log(likeButton);
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
// const popupContainerNode = popupContainer.cloneNode(true);
// console.log(popupContainerNode);
const popupCloseButton = popup.querySelector('.popup__close-button');
console.log(popupCloseButton);
const popupForm = popup.querySelector('.popup__form');
console.log(popupForm);
const popupTitle = popup.querySelector('.popup__title');
console.log(popupTitle);
const popupFirstInput = popup.querySelector('.popup__input:nth-child(1)');
console.log(popupFirstInput);
const popupSecondInput = popup.querySelector('.popup__input:nth-child(2)');
console.log(popupSecondInput);
// это надо перенести - const popupFullName = popup.querySelector('#full-name');
// это надо перенести - const popupProfession = popup.querySelector('#profession');
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
// let caseEditProfile = popup.classList.contains('popup_functional_edit-profile');
let caseEditProfile = false;
// console.log(caseEditProfile);
let caseAddPlace = false;
console.log(caseAddPlace);
// let caseAddPlace = popup.classList.contains('popup_functional_add-place');
let casePopupOpened = false;
// let casePopupOpened = popup.classList.contains('popup_opened');
let caseShowImage = false;
// let casePicture = popup.classList.contains('popup_functional_picture');
// console.log(popupContainer);
// console.log(popupContainer.content);
// const popupContainerContent = popupContainer.content.cloneNode(true);
// console.log(popupContainerContent);


// const elementTitle = listElement.querySelector('.element__text');
// console.log(elementTitle);
// const elementImage = listElement.querySelector('.element__image');
// console.log(elementImage);

// let counter = 0;

const addElementsToContainer = elementObject => {
  const listElement = document.querySelector('#template-element').content.cloneNode(true);
  // counter++;
  // console.log(counter);
  listElement.querySelector('.element__text').textContent = elementObject.name;
  // console.log(elementTitle.textContent);
  listElement.querySelector('.element__image').setAttribute('src', elementObject.link);
  // console.log(elementImage);
  if(caseAddPlace) {
    elementsListContainer.prepend(listElement);
  }
  elementsListContainer.append(listElement);
}

// const handleElements = (elementObject = undefined) => {
//   if(elementObject) {
//     elementsArr.unshift(elementObject);
//     console.log(elementsArr);    
//   };
//   elementsArr.forEach(addElementsToContainer);
// }

// handleElements();
elementsArr.forEach(addElementsToContainer);

function specializePopup(evt) {
  // if(popup.querySelector('.popup__image-figure')) {
  //   console.log('Убедится что popup__image-figure еще не удалился');
  //   console.log(popup);
  //   popup.querySelector('.popup__image-figure').remove();
  //   console.log('Убедится что popup__image-figure теперь удалился');
  //   console.log(popup);
  // }
  // if(popupContainer.classList.contains('popup__container_disabled')) {
  //   console.log('Убедится что popup__container_disabled еще не убрался');
  //   console.log(popup);
  //   popupContainer.classList.remove('popup__container_disabled');
  //   console.log('Убедится что popup__container_disabled теперь убрался');
  //   console.log(popup);
  // }
  const eventTarget = evt.target;
  const eventTargetElement = evt.target.closest('.element');
  console.log(eventTarget);
  console.log(eventTargetElement);
  // console.log(popup.classList.contains('popup_functional_edit-profile'));
  // console.log(caseAddPlace);
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
      console.log('Провенряем что попали сюда - редактирование профиля');
      popupFirstInput.value = docFullName.textContent;
      popupSecondInput.value = docProfession.textContent;
    }
    console.log(popup.classList);
  }
  else if(caseAddPlace) {
    console.log(caseAddPlace);
    console.log('Внимательно посмотри на второй попап ниже');
    console.log(popup);
    console.log(popupTitle);
    popupTitle.textContent = 'Новое место';
    console.log(popupTitle);
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
    console.log('Внимательно посмотри на третий попап ниже');
    console.log(popup);
    console.log(popup.classList);
  }
  else if(caseShowImage) {
    console.log(caseShowImage);
    console.log(eventTarget.src);
    console.log(eventTargetElement);
    popupContainer.classList.add('popup__container_disabled');
    // popupContainer.remove();
    // popupTitle.classList.add('popup__title_disabled');
    // popupTitle.remove();
    // popupForm.classList.add('popup__form_disabled');
    // popupForm.remove();

    popup.insertAdjacentHTML('afterbegin', `<figure class='popup__image-figure'><img class='popup__image'><figcaption class='popup__caption'></figcaption></figure>`);
    // popup.innerHTML = `<figure class="popup__image-figure">
                        // <button class="popup__close-button" type="button"></button>
                        // <img class="popup__image"></img>
                        // <figcaption class="popup__caption"></figcaption>
                      // </figure>`;
    // popup.querySelector('.popup__close-button').classList.add('popup__close-button_theme_for-image');
    popup.querySelector('.popup__image-figure').prepend(popupCloseButton);
    // popupContainer.classList.add('popup__container_theme_image');

    console.log('Попап ниже должен содержать внутри себя класс popup__image-figure а кнопка popupCloseButton перемещена из Попап контейнера в попап фигуре имадж');
    console.log(popup);
    popup.querySelector('.popup__image').setAttribute('src', eventTarget.src);
    popup.querySelector('.popup__caption').textContent = eventTargetElement.querySelector('.element__text').textContent;
    // popup.querySelector('.popup__caption').insertAdjacentText('afterend', `</img>`);
    console.log(popup.querySelector('.popup__image').src);
    console.log(popup.querySelector('.popup__caption').textContent);
    popupToggle();
    console.log(popup.classList);
  }
}

function popupToggle() {
  // if(!popup.classList.contains('popup_opened'))
    // specializePopup(evt);
  popup.classList.toggle('popup_opened');
  casePopupOpened = popup.classList.contains('popup_opened');
  console.log(popup.classList);
  // if(popup.classList.contains('popup_opened') && popup.classList.contains('popup_functional_edit-profile')) {
    // popupFirstInput.value = docFullName.textContent;
    // popupSecondInput.value = docProfession.textContent;
    // popup.classList.toggle('popup_functional_edit-profile');
    // return;
  
  if(!casePopupOpened)
    setTimeout(makeAllToInitialState, 1000);
  //   if(caseEditProfile) {
  //     popup.classList.remove('popup_functional_edit-profile');
  //     caseEditProfile = popup.classList.contains('popup_functional_edit-profile');
  //   }
  //   else if(caseAddPlace) {
  //     popup.classList.remove('popup_functional_add-place');
  //     caseAddPlace = popup.classList.contains('popup_functional_add-place');
  //   }
  //   else if(caseShowImage) {
  //     popup.classList.remove('popup_functional_show-image');
  //     caseShowImage = popup.classList.contains('popup_functional_show-image');
  //     console.log(popup.querySelector('.popup__image-figure'));
      // popup.querySelector('.popup__image-figure').remove();
      // popupContainer.classList.remove('popup__container_disabled');
      // console.log('look popup - popup__container_disabled removed?');
      // console.log(popup);
      // popup.append(popupContainerBackup);
      // console.log(popup);
    // }
    // popupForm.reset();
  console.log('Перед завершением функции toggle этот код ниже, работает?');
  console.log(popup.classList);
}

function popupClose (evt) {
  if(evt.target !== evt.currentTarget) return;
    popupToggle();
}

function makeAllToInitialState() {
  console.log('Убедимся что попали в функцию сброса в исходное состояния');
  if(!casePopupOpened) {
    if(caseEditProfile) {
      console.log('Убедимся что попали в случай сброса класса - редактирование профиля');
      popup.classList.remove('popup_functional_edit-profile');
      caseEditProfile = popup.classList.contains('popup_functional_edit-profile');
    }
    else if(caseAddPlace) {
      console.log('Убедимся что попали в случай сброса класса - добавление места');
      popup.classList.remove('popup_functional_add-place');
      caseAddPlace = popup.classList.contains('popup_functional_add-place');
    }
    else if(caseShowImage) {
      console.log('Убедись что попап содержит класс popup_functional_show-image');
      console.log(popup.classList);
      console.log('Убедись что кнопка закрытия попап вернулась обратно в контейнер');
      popupContainer.prepend(popupCloseButton);
      console.log(popupContainer);
      popup.classList.remove('popup_functional_show-image');
      caseShowImage = popup.classList.contains('popup_functional_show-image');
      console.log(caseShowImage);
      console.log('Убедись что попап НЕ содержит класс popup_functional_show-image');
      console.log(popup.classList);
      console.log('Убедись что рядом с попап контейнер стоит класс popup__image-figure');
      console.log(popup.querySelector('.popup__image-figure'));
      popup.querySelector('.popup__image-figure').remove();
      console.log('Убедись что класса popup__image-figure больше нет');
      console.log(popup.querySelector('.popup__image-figure'));
      console.log(popup);
      console.log('Убедись что попап контейнер содержит класс popup__container_disabled');
      console.log(popupContainer.classList);
      popupContainer.classList.remove('popup__container_disabled');
      console.log('look popup - popup__container_disabled removed?');
      console.log(popupContainer.classList);
    }
    popupForm.reset();
    console.log('Убедимся что попап ниже, возвращен в исходное состояние и не содержит лишних классов');
    console.log(popup);
    console.log(popup.classList);
  }
}

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

document.addEventListener('click', evt => {
  // if(evt.target.classList.contains('element__like_active')) {
  //   evt.target.classList.toggle('element__like_active');
  //   return;
  // };
  // console.log(evt.target.classList[0]);
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
// profileEditButton.addEventListener('click', popupToggle);
// profileAddButton.addEventListener('click', popupToggle);
// popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);