import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._formInputsValues = {};
    this._bindedHandleFormSubmit = this._handleFormSubmit.bind(this);
  }


  //Возвращает объект со значениями всех полей ввода формы
  _getInputValues() {
    this._formInputsList.forEach(input => {
      this._formInputsValues[input.name] = input.value;
    });
    return this._formInputsValues;
  }

  //Открывает попап с формой
  open() {
    super.open();
  }

  //Закрывает попап с формой
  close() {
    super.close();
    this._form.reset();
  }

  //Задействует функцию обработки события "сабмит", либо для попапа-формы с добавлением места, либо для попапа-формы
  //с редактированием профиля
  _handleFormSubmit(evt) {
    debugger;
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues());
    this.close();
  }

  //Установка всех слушателей
  setEventListeners() {
    this._form.addEventListener('submit', this._bindedHandleFormSubmit);
    super.setEventListeners();
  }

  //Удаление всех слушателей
  removeEventListeners() {
    this._form.removeEventListener('submit', this._bindedHandleFormSubmit);
    super.removeEventListeners();
  }

}