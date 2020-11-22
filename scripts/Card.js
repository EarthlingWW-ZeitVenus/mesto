//Немного схалтурил, пока ничего лучше не придумал, уж больно не хочется код дублировать...
import { openPopup, popupElement } from './index.js';

export class Card {
  constructor(elementData, cardData) {
    this._text = elementData.name;
    this._image = elementData.link;
    this._alt = elementData.alt;
    this._selector = cardData.templateSelector;
    this._cardData = cardData;
    this._element = document.querySelector(cardData.templateSelector).content.cloneNode(true);
    this._elementImage = this._element.querySelector(cardData.imageSelector);
    this._elementText = this._element.querySelector(cardData.textSelector);
    this._elementLikeButton = this._element.querySelector(cardData.likeButtonSelector);
    this._elementDeleteButton = this._element.querySelector(cardData.deleteButtonSelector);
    this._popupThemeImage = document.querySelector(cardData.popupThemeImage);
    this._popupElementImage = document.querySelector(cardData.popupElementImage);
    this._popupImageCaption = document.querySelector(cardData.popupImageCaption);
  }

  // _openPopupImage() {
  // }

  _handleLikeStatus(evt) {
    evt.target.classList.toggle(this._cardData.elementLikeActive);
  }

  _handleDeleteElement(evt) {
    evt.target.closest(this._cardData.templateElement).remove();
  }

  _handleOpenImage(evt) {
    const targetImage = evt.target;
    const targetElement = evt.target.closest(this._cardData.templateElement);
    this._popupElementImage.setAttribute('src', targetImage.src);
    this._popupImageCaption.textContent = targetElement.querySelector(this._cardData.textSelector).textContent;
    // this._cardData.functionOpenPopup;
    openPopup(popupElement);
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', evt => this._handleLikeStatus(evt));
    this._elementDeleteButton.addEventListener('click', evt => this._handleDeleteElement(evt));
    this._elementImage.addEventListener('click', evt => this._handleOpenImage(evt)); 
  }

  generateCard() {
    this._elementText.textContent = this._text;
    this._elementImage.alt = this._alt || this._text;
    this._elementImage.setAttribute('src', this._image);
    this._setEventListeners();
    return this._element;
  }


}