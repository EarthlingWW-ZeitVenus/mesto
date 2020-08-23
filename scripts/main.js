let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupFullName = popup.querySelector('#full-name');
let popupProfession = popup.querySelector('#profession');
let popupForm = popup.querySelector('.popup__form');
let docFullName = document.querySelector('.profile__full-name');
let docProfession = document.querySelector('.profile__profession');

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