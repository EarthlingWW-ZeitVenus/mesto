const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const popupTitle = popup.querySelector('.popup__title');
const popupFirstInput = popup.querySelector('.popup__input:nth-child(1)');
const popupSecondInput = popup.querySelector('.popup__input:nth-child(2)');
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
  if(popup.classList.contains('popup_functional_add-place')) {
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

const specializePopup = evt => {
  if(evt.target.classList.contains('profile__edit-button')) {
    popup.classList.toggle('popup_functional_edit-profile');
    popupTitle.textContent = 'Редактировать профиль';
    popupForm.setAttribute('id', 'profile-info');
    popupForm.setAttribute('name', 'profile-info');
    popupFirstInput.setAttribute('id', 'full-name');
    popupFirstInput.setAttribute('name', 'full-name');
    popupFirstInput.classList.add('popup__input_field_full-name');
    popupSecondInput.setAttribute('id', 'profession');
    popupSecondInput.setAttribute('name', 'profession');
    popupSecondInput.classList.add('popup__input_field_profession');
    console.log(popup.classList);
  }
  else if(evt.target.classList.contains('profile__add-button')) {
    popup.classList.toggle('popup_functional_add-place');
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
    console.log(popup.classList);
  }
}

function popupToggle(evt) {
  if(!popup.classList.contains('popup_opened'))
    specializePopup(evt);
  popup.classList.toggle('popup_opened');
  console.log(popup.classList);
  if(popup.classList.contains('popup_opened') && popup.classList.contains('popup_functional_edit-profile')) {
    popupFirstInput.value = docFullName.textContent;
    popupSecondInput.value = docProfession.textContent;
    // popup.classList.toggle('popup_functional_edit-profile');
    // return;
  };
  if(!popup.classList.contains('popup_opened') && popup.classList.contains('popup_functional_edit-profile'))
    popup.classList.toggle('popup_functional_edit-profile');
  else if (!popup.classList.contains('popup_opened') && popup.classList.contains('popup_functional_add-place'))
    popup.classList.toggle('popup_functional_add-place');
  console.log(popup.classList);
}

function popupClose (event) {
  if(event.target !== event.currentTarget) return;
    popupToggle();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  if(popup.classList.contains('popup_functional_edit-profile')) {
    docFullName.textContent = popupFirstInput.value;
    docProfession.textContent = popupSecondInput.value;
  }
  else if(popup.classList.contains('popup_functional_add-place')) {
    const elementObject = {
      name: String(popupFirstInput.value),
      link: String(popupSecondInput.value),
    }
    addElementsToContainer(elementObject);
  }
  console.log('Я попал сюда');
  popupToggle();
  return;
}

profileEditButton.addEventListener('click', popupToggle);
profileAddButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);