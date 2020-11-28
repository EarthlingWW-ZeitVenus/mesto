export class Section {
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