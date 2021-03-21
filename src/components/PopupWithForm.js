import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._formInputsValues = {};
    this._formSubmitButton = this._form.querySelector('.popup__submit-button');
    this._formSubmitButtonText = this._formSubmitButton.textContent;
    this.bindedHandleFormSubmit = this.handleFormSubmit.bind(this);
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

  //Задействует функцию обработки события "сабмит", либо для любого попапа
  handleFormSubmit(evt) {
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues(), this);
    // this.close();
  }

  //Отображение статуса загрузки данных с сервера или выгрузки данных на сервер
  renderLoading(isTrue, processText) {
    if(isTrue) {
      this._formSubmitButton.textContent = String(processText);
    }
    else {
      this._formSubmitButton.textContent = String(this._formSubmitButtonText);
    }
  }

  //Установка всех слушателей
  setEventListeners() {
    this._form.addEventListener('submit', this.bindedHandleFormSubmit);
    super.setEventListeners();
  }

  //Удаление всех слушателей
  removeEventListeners() {
    this._form.removeEventListener('submit', this.bindedHandleFormSubmit);
    super.removeEventListeners();
  }

}