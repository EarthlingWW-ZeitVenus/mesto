//Объект настроек
const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}


//Показывает красное поле и текст ошибки
function showInputError(targetForm, targetInput, errorMessage, settingsObject) {
    const targetError = targetForm.querySelector(`#${targetInput.id}-error`);
    targetInput.classList.add(settingsObject.inputErrorClass);
    targetError.textContent = errorMessage;
    targetError.classList.add(settingsObject.errorClass);
};


//Скрывает красное поле и текст ошибки, удаляет оставшийся текст
function hideInputError(targetForm, targetInput, settingsObject) {
    const targetError = targetForm.querySelector(`#${targetInput.id}-error`);
    targetInput.classList.remove(settingsObject.inputErrorClass);
    targetError.classList.remove(settingsObject.errorClass);
    targetError.textContent = '';
  };


//Проверяет валидность поля
function isValid(targetForm, targetInput, settingsObject) {
  if (!targetInput.validity.valid) {
    showInputError(targetForm, targetInput, targetInput.validationMessage, settingsObject);
  } else {
    hideInputError(targetForm, targetInput, settingsObject);
  }
};


//Проверяет все поля формы на валидность
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};


//Меняет вид и состояние кнопки, в зависимости от валидности полей
function toggleButtonState(inputList, targetButton, settingsObject) {
    if (hasInvalidInput(inputList)) {
      targetButton.classList.add(settingsObject.inactiveButtonClass);
      targetButton.setAttribute('disabled', '');
    }
    else {
      targetButton.classList.remove(settingsObject.inactiveButtonClass);
      targetButton.removeAttribute('disabled', '');
    }
  };


//Добавляет слушатели на все поля ввода формы
function setEventListeners(targetForm, settingsObject) {
  const inputList = Array.from(targetForm.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = targetForm.querySelector(settingsObject.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(targetForm, inputElement, settingsObject);
      toggleButtonState(inputList, buttonElement, settingsObject);
    });
  });
};


//Отменяет стандартную процедуру "submit" у всех форм на странице, запускает процесс добавления слушателей для каждой найденной формы
function enableValidation(settingsObject) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, settingsObject);
  });
};


enableValidation(settingsObject);