const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileForm = document.forms.profileinfo;
const popupProfileFormFullName = popupProfileForm.elements.fullname;
const popupProfileFormProfession = popupProfileForm.elements.profession;
const elementObject = {};

const objectsArr = [
    {
      name: 'Дельфины',
      link: 'images/Dolphins.jpg',
      alt: 'два дельфина плывут по голубой воде'
    },
    {
      name: 'Рыба молот',
      link: 'images/Hammerhead-fish.jpg',
      alt: 'рыба-молот, вид спереди, на глубине, под водой'
    },
    {
      name: 'Медузы',
      link: 'images/Jelly-fish.jpg',
      alt: 'стая медуз под водой'
    },
    {
      name: 'Морская черепаха',
      link: 'images/Sea-turtle.jpg',
      alt: 'морская черепаха плывет под водой'
    },
    {
      name: 'Береговая линия',
      link: 'images/Shoreline.jpg',
      alt: 'береговая линия, рядом очертания берега, грота и морского прилива, вдали очертания мыса и кусок скалы'
    },
    {
      name: 'Стая акул',
      link: 'images/Snorkel-trip.jpg',
      alt: 'Стая акул плывет под водой'
    }
  ];
  
  //Объекты настроек классов cardData, validatorData и popupData
  const cardData = {
    templateSelector: '#template-element',
    imageSelector: '.element__image',
    deleteButtonSelector: '.element__delete',
    likeButtonSelector: '.element__like',
    textSelector: '.element__text',
    templateElement: '.element',
    elementLikeActive: 'element__like_active',
    popupThemeImage: '.popup_theme_image',
    containerSelector: '.elements__list'
  }
  const validatorData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }
  const popupData = {
    popupProfile: '.popup_theme_profile',
    popupPlace: '.popup_theme_place',
    popupImage: '.popup_theme_image'
  }

  export { profileEditButton, profileAddButton, popupProfileFormFullName, popupProfileFormProfession,
    elementObject, objectsArr, cardData, validatorData, popupData };
  