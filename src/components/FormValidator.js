export default class FormValidator {
  constructor(validatorData, formSelector) {
    this._formSelector = formSelector;
    this._validatorData = validatorData;
    this._inputList = Array.from(formSelector.querySelectorAll(validatorData.inputSelector));
    this._buttonElement = formSelector.querySelector(validatorData.submitButtonSelector);
  }


  //Показывает красное поле и текст ошибки
  _showInputError(targetInput, errorMessage) {
    const targetError = this._formSelector.querySelector(`#${targetInput.id}-error`);
    targetInput.classList.add(this._validatorData.inputErrorClass);
    targetError.textContent = errorMessage;
    targetError.classList.add(this._validatorData.errorClass);
  }

  //Скрывает красное поле и текст ошибки, удаляет оставшийся текст
  _hideInputError(targetInput) {
    const targetError = this._formSelector.querySelector(`#${targetInput.id}-error`);
    targetInput.classList.remove(this._validatorData.inputErrorClass);
    targetError.classList.remove(this._validatorData.errorClass);
    targetError.textContent = '';
  }

  //Проверяет валидность поля
  _isValid(targetInput) {
    if (!targetInput.validity.valid) {
      this._showInputError(targetInput, targetInput.validationMessage);
    } else {
      this._hideInputError(targetInput);
    }
  }

  //Проверяет все поля формы на валидность
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  //Меняет вид и состояние кнопки, в зависимости от валидности полей
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validatorData.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    }
    else {
      this._buttonElement.classList.remove(this._validatorData.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  //Добавляет слушатели на все поля ввода формы
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Отменяет стандартную процедуру "submit" у всех форм на странице, запускает процесс добавления слушателей для каждой найденной формы
  enableValidation() {
    this._inputList.forEach(inputElement => this._isValid(inputElement));
    this._toggleButtonState();
    this._setEventListeners();
  };

}