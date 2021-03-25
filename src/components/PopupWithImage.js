import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElementImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
  }

  
  //Открывает попап с картинкой
  open(cardText, cardImage) {
    this._popupElementImage.setAttribute('src', cardImage);
    this._popupImageCaption.textContent = cardText;
    super.open();
  }
}