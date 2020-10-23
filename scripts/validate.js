const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function showInputError(targetForm, targetInput, errorMessage, settingsObject) {
    const targetError = targetForm.querySelector(`#${targetInput.id}-error`);
    targetInput.classList.add(settingsObject.inputErrorClass);
    targetError.textContent = errorMessage;
    targetError.classList.add(settingsObject.errorClass);
};

function hideInputError(targetForm, targetInput, settingsObject) {
    const targetError = targetForm.querySelector(`#${targetInput.id}-error`);
    targetInput.classList.remove(settingsObject.inputErrorClass);
    targetError.classList.remove(settingsObject.errorClass);
    targetError.textContent = '';
  };

function isValid(targetForm, targetInput, settingsObject) {
  if (!targetInput.validity.valid) {
    showInputError(targetForm, targetInput, targetInput.validationMessage, settingsObject);
  } else {
    hideInputError(targetForm, targetInput, settingsObject);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

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

function enableValidation(settingsObject) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, settingsObject);
  });
};

enableValidation(settingsObject);