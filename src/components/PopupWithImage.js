import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElementImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
  }

  
  //Открывает попап с картинкой
  open(evt) {
    const targetImage = evt.target;
    const targetElement = evt.target.closest('.element');
    this._popupElementImage.setAttribute('src', targetImage.src);
    this._popupImageCaption.textContent = targetElement.querySelector('.element__text').textContent;
    super.open();
  }
}