const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileForm = document.forms.profileinfo;
const popupProfileFormFullName = popupProfileForm.elements.fullname;
const popupProfileFormProfession = popupProfileForm.elements.profession;
const elementObject = {};
import dolphinsImage from '../images/Dolphins.jpg';
import hammerheadFishImage from '../images/Hammerhead-fish.jpg';
import jellyFishImage from '../images/Jelly-fish.jpg';
import seaTurtleImage from '../images/Sea-turtle.jpg';
import shorelineImage from '../images/Shoreline.jpg';
import snorkelTripImage from '../images/Snorkel-trip.jpg';

const objectsArr = [
    {
      name: 'Дельфины',
      link: dolphinsImage,
      alt: 'два дельфина плывут по голубой воде'
    },
    {
      name: 'Рыба молот',
      link: hammerheadFishImage,
      alt: 'рыба-молот, вид спереди, на глубине, под водой'
    },
    {
      name: 'Медузы',
      link: jellyFishImage,
      alt: 'стая медуз под водой'
    },
    {
      name: 'Морская черепаха',
      link: seaTurtleImage,
      alt: 'морская черепаха плывет под водой'
    },
    {
      name: 'Береговая линия',
      link: shorelineImage,
      alt: 'береговая линия, рядом очертания берега, грота и морского прилива, вдали очертания мыса и кусок скалы'
    },
    {
      name: 'Стая акул',
      link: snorkelTripImage,
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
  