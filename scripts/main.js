let Popup = document.querySelector('.popup');
let ProfileEditButton = document.querySelector('.profile__edit-button');
let PopupCloseButton = Popup.querySelector('.popup__close-button');
let PopupFullName = Popup.querySelector('.popup__full-name');
let PopupProfession = Popup.querySelector('.popup__profession');
let PopupForm = Popup.querySelector('.popup__form');
// let PopupSubmitButton = Popup.querySelector('.popup__form-submit');
// submit на кнопку не работает, работает submit на форму

PopupFullName.value = (document.querySelector('.profile__full-name')).textContent;
PopupProfession.value = (document.querySelector('.profile__profession')).textContent;


function PopupToggle() {
  // console.log(event);
  Popup.classList.toggle('popup_opened');
}

function PopupClose (event) {
  if (event.target !== event.currentTarget) return;
  PopupToggle();
}

function FormSubmitHandler (evt) {
  // console.log('some text');
  // console.log(evt);
  evt.preventDefault();
  let DocFullName = document.querySelector('.profile__full-name');
  let DocProfession = document.querySelector('.profile__profession');
  DocFullName.textContent = PopupFullName.value;
  DocProfession.textContent = PopupProfession.value;
  // (document.querySelector('.profile__full-name')).textContent = PopupFullName.value;
  // (document.querySelector('.profile__profession')).textContent = PopupProfession.value;
  PopupToggle();
  return;
}

ProfileEditButton.addEventListener('click', PopupToggle);
PopupCloseButton.addEventListener('click', PopupToggle);
Popup.addEventListener('click', PopupClose);
PopupForm.addEventListener('submit', FormSubmitHandler);