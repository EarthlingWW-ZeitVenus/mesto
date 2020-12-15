export default class Card {
  constructor(elementData, cardData, handleCardClick) {
    this._text = elementData.name;
    this._image = elementData.link;
    this._alt = elementData.alt;
    this._selector = cardData.templateSelector;
    this._cardData = cardData;
    this._element = document.querySelector(cardData.templateSelector).content.querySelector('.element').cloneNode(true);
    this._elementImage = this._element.querySelector(cardData.imageSelector);
    this._elementText = this._element.querySelector(cardData.textSelector);
    this._elementLikeButton = this._element.querySelector(cardData.likeButtonSelector);
    this._elementDeleteButton = this._element.querySelector(cardData.deleteButtonSelector);
    this._handleCardClick = handleCardClick;
  }


  //Проставляет "лайк"-статус для картинки
  _handleLikeStatus() {
    this._elementLikeButton.classList.toggle(this._cardData.elementLikeActive);
  }

  //Удаляет карточку
  _handleDeleteElement() {
    this._element.remove();
  }

  //Открывает попап с картинкой
  _handleOpenImage(cardText, cardImage) {
    this._handleCardClick(cardText, cardImage);
  }

  //Установка всех "слушателей-событий"
  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => this._handleLikeStatus());
    this._elementDeleteButton.addEventListener('click', () => this._handleDeleteElement());
    this._elementImage.addEventListener('click', () => this._handleOpenImage(this._text, this._image)); 
  }

  //Наполняет разметку карточки данными и атрибутами, ставит "слушателей" и возвращает разметку
  generateCard() {
    this._elementText.textContent = this._text;
    this._elementImage.alt = this._alt || this._text;
    this._elementImage.setAttribute('src', this._image);
    this._setEventListeners();
    return this._element;
  }

}