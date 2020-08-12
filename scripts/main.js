let Popup = document.querySelector('.popup');
let ProfileEditButton = document.querySelector('.profile__edit-button');
let PopupCloseButton = Popup.querySelector('.popup__close-button');
let PopupFullName = Popup.querySelector('.popup__full-name');
let PopupProfession = Popup.querySelector('.popup__profession');
// let PopupSubmitButton = Popup.querySelector('.popup__form-submit');
let PopupForm = Popup.querySelector('.popup__form');

// console.dir(PopupFullName);
// console.log(PopupProfession);
// console.log(PopupSubmitButton);

PopupFullName.value = (document.querySelector('.profile__full-name')).textContent;
PopupProfession.value = (document.querySelector('.profile__profession')).textContent;


function PopupToggle () {
//   console.log(event);
Popup.classList.toggle('popup_opened');
}

function PopupClose (event) {
  if (event.target !== event.currentTarget) return;
  PopupToggle();
}

// console.log('some other text');

function FormSubmitHandler (evt) {
  // console.log('some text');
  // console.log(evt);
  evt.preventDefault();
  (document.querySelector('.profile__full-name')).textContent = PopupFullName.value;
  (document.querySelector('.profile__profession')).textContent = PopupProfession.value;
  PopupToggle();
  return;
}

// PopupToggle();

ProfileEditButton.addEventListener('click', PopupToggle);
PopupCloseButton.addEventListener('click', PopupToggle);
Popup.addEventListener('click', PopupClose);
PopupForm.addEventListener('submit', FormSubmitHandler);

// console.log(PopupCloseButton);
// console.log(ProfileEditButton);
// console.log(Popup);