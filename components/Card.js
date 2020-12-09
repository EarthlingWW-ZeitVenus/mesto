//ToDo: Проверить в конструкторе класса - какие переменные не используются - их удалить +

export default class Card {
  constructor(elementData, cardData, handleCardClick) {
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
    this._handleCardClick = handleCardClick;
  }


  //Проставляет "лайк"-статус для картинки
  _handleLikeStatus(evt) {
    evt.target.classList.toggle(this._cardData.elementLikeActive);
  }

  //Удаляет карточку
  _handleDeleteElement(evt) {
    evt.target.closest(this._cardData.templateElement).remove();
  }

  //Открывает попап с картинкой
  _handleOpenImage(evt) {
    this._handleCardClick(evt);
  }

  //Установка всех "слушателей-событий"
  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', evt => this._handleLikeStatus(evt));
    this._elementDeleteButton.addEventListener('click', evt => this._handleDeleteElement(evt));
    this._elementImage.addEventListener('click', evt => this._handleOpenImage(evt)); 
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