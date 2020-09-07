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
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const popupTitle = popup.querySelector('.popup__title');
const popupFirstInput = popup.querySelector('.popup__input:nth-child(1)');
const popupSecondInput = popup.querySelector('.popup__input:nth-child(2)');
const popupContainer = popup.querySelector('.popup__container');
// это надо перенести - const popupFullName = popup.querySelector('#full-name');
// это надо перенести - const popupProfession = popup.querySelector('#profession');
const elementsArr = [
  {
      name: 'Дельфины',
      link: 'images/dolphins-282px.jpg'
  },
  {
      name: 'Рыба молот',
      link: 'images/fish-hammer-282px.jpg'
  },
  {
      name: 'Медузы',
      link: 'images/jelly-fish-282px.jpg'
  },
  {
      name: 'Морская черепаха',
      link: 'images/sea-turtle-282px.jpg'
  },
  {
      name: 'Береговая линия',
      link: 'images/shoreline-282px.jpg'
  },
  {
      name: 'Стая акул',
      link: 'images/snorkel-trip-282px.jpg'
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
// const popupContainerBackup = popupContainer.cloneNode(true);
// console.log(popupContainerBackup);


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
    popup.insertAdjacentHTML('afterbegin', `<figure class='popup__image-figure'><button class='popup__close-button' type='button'></button><img class='popup__image'><figcaption class='popup__caption'></figcaption></figure>`);
    // popup.innerHTML = `<figure class="popup__image-figure">
                        // <button class="popup__close-button" type="button"></button>
                        // <img class="popup__image"></img>
                        // <figcaption class="popup__caption"></figcaption>
                      // </figure>`;
    popup.querySelector('.popup__close-button').classList.add('popup__close-button_theme_for-image');
    console.log('Внимательно посмотри на четвертый попап ниже');
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
  setTimeout(makeAllToInitialState, 1000);  
  // if(!casePopupOpened) {
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
  console.log('Перед завершением функции этот код ниже, работает?');
  console.log(popup.classList);
}

function popupClose (evt) {
  if(evt.target !== evt.currentTarget) return;
    popupToggle();
}

function makeAllToInitialState() {
  if(!casePopupOpened) {
    if(caseEditProfile) {
      popup.classList.remove('popup_functional_edit-profile');
      caseEditProfile = popup.classList.contains('popup_functional_edit-profile');
    }
    else if(caseAddPlace) {
      popup.classList.remove('popup_functional_add-place');
      caseAddPlace = popup.classList.contains('popup_functional_add-place');
    }
    else if(caseShowImage) {
      console.log('Убедись что попап содержит класс popup_functional_show-image');
      console.log(popup.classList);
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