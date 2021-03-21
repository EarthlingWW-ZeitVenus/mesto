//ToDo: Проверить в конструкторе класса - какие переменные не используются - их удалить +
export default class Card {
  constructor(varData, constData, callbacksForCard, profileId) {
    this._cardVarData = varData;
    this.likesNumber = this._cardVarData.likes.length;
    this._likesIdArray = this._cardVarData.likes.map((likeItem) => {return likeItem._id});
    this.haveUserLike = this._likesIdArray.some((likeIdItem) => {return likeIdItem === profileId});
    this._text = this._cardVarData.name;
    this._image = this._cardVarData.link;
    this._alt = this._cardVarData.alt;
    this.cardId = this._cardVarData._id;
    this._cardOwnerId = this._cardVarData.owner._id;
    this._profileId = profileId;
    this._selector = constData.templateSelector;
    this.cardData = constData;
    this.element = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    this._elementImage = this.element.querySelector(this.cardData.imageSelector);
    this._elementText = this.element.querySelector(this.cardData.textSelector);
    this.elementLikeButton = this.element.querySelector(this.cardData.likeButtonSelector);
    this._elementDeleteButton = this.element.querySelector(this.cardData.deleteButtonSelector);
    this.elementLikesNumber = this.element.querySelector(this.cardData.likesNumberSelector);
    this._callbacksForCard = callbacksForCard;
  }


  //Проставляет "лайк"-статус для картинки
  _handleLikeStatus() {
    this._callbacksForCard.handleLikeStatus(this);
  }

  //Удаляет карточку
  _handleDeleteElement() {
    this._callbacksForCard.handleDeleteCard(this);
  }

  //Открывает попап с картинкой
  _handleOpenImage(cardText, cardImage) {
    this._callbacksForCard.handleImageOpen(cardText, cardImage);
  }

  //Установка всех "слушателей-событий"
  _setEventListeners() {
    this.elementLikeButton.addEventListener('click', () => this._handleLikeStatus());
    this._elementDeleteButton.addEventListener('click', () => this._handleDeleteElement());
    this._elementImage.addEventListener('click', () => this._handleOpenImage(this._text, this._image)); 
  }

  //Наполняет разметку карточки данными и атрибутами, ставит "слушателей" и возвращает разметку
  generateCard() {
    this._elementText.textContent = this._text;
    this._elementImage.alt = this._alt || this._text;
    this._elementImage.setAttribute('src', this._image);
    this.elementLikesNumber.textContent = this.likesNumber;
    this._setEventListeners();
    if(this._cardOwnerId !== this._profileId)
      this._elementDeleteButton.remove();
    if(this.haveUserLike)
      this.elementLikeButton.classList.add(this.cardData.elementLikeActive);
    return this.element;
  }

}