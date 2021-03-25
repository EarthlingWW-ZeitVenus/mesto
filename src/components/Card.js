//ToDo: Проверить в конструкторе класса - какие переменные не используются - их удалить +
export default class Card {
  constructor(varData, constData, callbacksForCard, profileId) {
    this._cardVarData = varData;
    this._likesNumber = this._cardVarData.likes.length;
    this._likesIdArray = this._cardVarData.likes.map((likeItem) => {return likeItem._id});
    this._haveUserLike = this._likesIdArray.some((likeIdItem) => {return likeIdItem === profileId});
    this._text = this._cardVarData.name;
    this._image = this._cardVarData.link;
    this._alt = this._cardVarData.alt;
    this._cardId = this._cardVarData._id;
    this._cardOwnerId = this._cardVarData.owner._id;
    this._profileId = profileId;
    this._selector = constData.templateSelector;
    this._cardData = constData;
    this._element = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    this._elementImage = this._element.querySelector(this._cardData.imageSelector);
    this._elementText = this._element.querySelector(this._cardData.textSelector);
    this._elementLikeButton = this._element.querySelector(this._cardData.likeButtonSelector);
    this._elementDeleteButton = this._element.querySelector(this._cardData.deleteButtonSelector);
    this._elementLikesNumber = this._element.querySelector(this._cardData.likesNumberSelector);
    this._callbacksForCard = callbacksForCard;
  }


  //Получение необходимой информации о карточке
  getCardInfo() {
    return {
      cardId: this._cardId,
      haveUserLike: this._haveUserLike
    };
  }

  //Удаляет карточку из верстки
  removeCard() {
    this._element.remove();
  }

  //Изменяет отображение и состояния лайка при удалении
  removeLike(likesNumber) {
    this._elementLikesNumber.textContent = likesNumber;
    this._elementLikeButton.classList.remove(this._cardData.elementLikeActive);
    this._likesNumber =  likesNumber;
    this._haveUserLike = false;
  }

  //Изменяет отображение и состояния лайка при добавлении
  addLike(likesNumber) {
    this._elementLikesNumber.textContent = likesNumber;
    this._elementLikeButton.classList.add(this._cardData.elementLikeActive);
    this._likesNumber =  likesNumber;
    this._haveUserLike = true;
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
    this._elementLikeButton.addEventListener('click', () => this._handleLikeStatus());
    this._elementDeleteButton.addEventListener('click', () => this._handleDeleteElement());
    this._elementImage.addEventListener('click', () => this._handleOpenImage(this._text, this._image)); 
  }

  //Наполняет разметку карточки данными и атрибутами, ставит "слушателей" и возвращает разметку
  generateCard() {
    this._elementText.textContent = this._text;
    this._elementImage.alt = this._alt || this._text;
    this._elementImage.setAttribute('src', this._image);
    this._elementLikesNumber.textContent = this._likesNumber;
    this._setEventListeners();
    if(this._cardOwnerId !== this._profileId)
      this._elementDeleteButton.remove();
    if(this._haveUserLike)
      this._elementLikeButton.classList.add(this._cardData.elementLikeActive);
    return this._element;
  }

}