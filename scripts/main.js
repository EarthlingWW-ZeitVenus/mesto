const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupFullName = popup.querySelector('#full-name');
const popupProfession = popup.querySelector('#profession');
const popupForm = popup.querySelector('.popup__form');
const docFullName = document.querySelector('.profile__full-name');
const docProfession = document.querySelector('.profile__profession');
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
const elementsListContainer = document.querySelector(".elements__list");


const addElementsToContainer = elementObject => {
  const listElement = document.querySelector('#template-element').content.cloneNode(true);
  listElement.querySelector(".element__text").textContent = elementObject.name;
  listElement.querySelector(".element__image").setAttribute('src', elementObject.link);
  elementsListContainer.append(listElement);
}

elementsArr.forEach(addElementsToContainer);

function popupToggle() {
  popup.classList.toggle('popup_opened');
  if(popup.classList.contains('popup_opened')) {
    popupFullName.value = docFullName.textContent;
    popupProfession.value = docProfession.textContent;
  }
}


function popupClose (event) {
  if (event.target !== event.currentTarget) return;
    popupToggle();
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  docFullName.textContent = popupFullName.value;
  docProfession.textContent = popupProfession.value;
  popupToggle();
  return;
}


profileEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);