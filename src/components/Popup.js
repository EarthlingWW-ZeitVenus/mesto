export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    // this._bindedClosePopupByClickOverlay = this._closePopupByClickOverlay.bind(this);
    // this.bindedClose = this.close.bind(this);
    // this._bindedHandleKeyEscapeKeydown = this._handleKeyEscapeKeydown.bind(this);
  }


  //Открывает попап
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', evt => this._handleKeyEscapeKeydown(evt));
    // this.setEventListeners();
  }

  //Закрывает попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => this._handleKeyEscapeKeydown(evt));
    // this.removeEventListeners();
  }

  //Закрытие попап по клику вне области попап
  _closePopupByClickOverlay(evt) {
    if(evt.target !== evt.currentTarget) return;
    this.close();
  }

  //Закрытие попап по кажатию клавиши "Esc"
  _handleKeyEscapeKeydown(evt) {
    if(evt.key === 'Escape' && this._popup.classList.contains('popup_opened')) {
      this.close();
    };
  }

  //Установка всех слушателей
  setEventListeners() {
    this._popup.addEventListener('click', evt => this._closePopupByClickOverlay(evt));
    this._popupCloseButton.addEventListener('click', () => this.close());
    // document.addEventListener('keydown', this._bindedHandleKeyEscapeKeydown);
  }

  //Удаление всех слушателей
  // removeEventListeners() {
  //   this._popup.removeEventListener('click', this._bindedClosePopupByClickOverlay);
  //   this._popupCloseButton.removeEventListener('click', this.bindedClose);
  //   document.removeEventListener('keydown', this._bindedHandleKeyEscapeKeydown);
  // }

}