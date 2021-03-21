//ToDo: Для Review сделать комментарии о назначении функций +
//ToDo: Поудалять излишние console.log, остальные заккоментировать +
//ToDo: Чеклист +
//ToDo: Проверить, что поиск элементов не повторяется +
//ToDo: Проверить, что объявления функций происходит до обращения к ним +
//ToDo: Почитать все комментарии, выполнить те пункты, которые я пометил на выполнение +
//ToDo: Везде, где используются промисы добавить catch +
//ToDo: Переделать приватные методы классов на публичные, если к ним пррисходит обращение в index.js и наоборот +
//ToDo: Удалить неиспользуемые компоненты их файла constatnts и ссылки на них в индексном файле +
//ToDo: Удалить массив изначальных данных, ссылки на него и используемые им переменные
//ToDo: В конце переделать под вебпак

//Note: Как переделать debug-версию под webpack-версию:
//1. В index.html перед закрывающим тегом body удалить строку подключающую главный файл скриптов
//2. Все ссылки на картинки в .js-файлах переделать на строки вида -
// const nameImage = new URL('./images/name-inamge.jpg', import.meta.url)
// - этот способ будет работать и без запуска Вебпака (как раз то, что мне нужно),
// затем импортировать созданные константы в нужные места
//3. Если в index.html есть теги img у которых присутствует атрибут src и прописан адрес до картинки, то привычный путь до
// картинки нужно заменить на такой <img src="<%=require('./images/logo.png')%>" alt="Логотип"> 
//4. Убрать из index.html тег link со ссылкой на стили, затем импортировать главный css-файл в index.js
// - import './styles/index.css' (набрать что-то наподобие этого в файле index.js)

import './index.css';

import { profileEditButton, profileAddButton, popupProfileFormFullName, popupProfileFormProfession,
  cardData, validatorData, popupData, apiData, profileAvatar } from '../utils/constants.js';


import Api from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api(apiData);
const imagePopup = new PopupWithImage(cardData.popupThemeImage);
const profileInfoApi = api.getProfile();
const objectsFromServerApi = api.getAllCards();
const userInfo = new UserInfo( {fullnameSelector:'.profile__full-name', professionSelector:'.profile__profession'} );
const validatorForProfile = new FormValidator(validatorData, document.forms.profileinfo);
const validatorForPlace = new FormValidator(validatorData, document.forms.placeinfo);

const popupWithFormProfile = new PopupWithForm(popupData.popupProfile, {
  formSubmitHandler: (formInputs, thisObject) => {
    popupWithFormProfile.renderLoading(true, "Сохранение...");
    const editProfileApi = api.editProfile(formInputs.name, formInputs.about);
    editProfileApi
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(error => alert(error))
    .finally(() => {
      popupWithFormProfile.renderLoading(false);
      thisObject.close();
    });
  }
});

const popupWithFormPlace = new PopupWithForm(popupData.popupPlace, {
  formSubmitHandler: (formInputs, thisObject) => {
    popupWithFormPlace.renderLoading(true, "Сохранение...");
    api.addCard(formInputs.placetitle, formInputs.linktoimage)
    .then(res => {
      const card = new Card(res, cardData, callbacksForCard, userInfo.getUserInfo().profileId);
      const sectionForElement = new Section({
        data: undefined,
        renderer: undefined
        },
        cardData.containerSelector
        );
      sectionForElement.addItem(card.generateCard());
    })
    .finally(() => {
      popupWithFormPlace.renderLoading(false);
      thisObject.close();
    });
  }
});

//Объект содержащий колбеки для экземпляров класса Card
const callbacksForCard = {
  handleDeleteCard: (thisCardObject) => {
    const popupWithFormDelete = new PopupWithForm(popupData.popupDelete, {
      formSubmitHandler: (undefined, thisPopupObject) => {
        api.deleteCard(thisCardObject.cardId)
        .then(() => {
          thisCardObject.element.remove();
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          thisPopupObject.close();
        });
      }
    });
    popupWithFormDelete.open();
  },
  handleImageOpen: (cardText, cardImage) => {
    imagePopup.open(cardText, cardImage);
  },
  handleLikeStatus: (thisObject) => {
    if(thisObject.haveUserLike) {
      api.deleteLike(thisObject.cardId)
      .then((res) => {
        thisObject.elementLikesNumber.textContent = res.likes.length;
        thisObject.elementLikeButton.classList.remove(thisObject.cardData.elementLikeActive);
        thisObject.likesNumber =  res.likes.length;
        thisObject.haveUserLike = false;
      })
      .catch((error) => {
        alert(error);
      });
    }
    else {
      api.addLike(thisObject.cardId)
      .then((res) => {
        thisObject.elementLikesNumber.textContent = res.likes.length;
        thisObject.elementLikeButton.classList.add(thisObject.cardData.elementLikeActive);
        thisObject.likesNumber =  res.likes.length;
        thisObject.haveUserLike = true;
      })
      .catch((error) => {
        alert(error);
      });
    }
  }  
}


//Получение всех данных с сервера, необходимых для начальной загрузки страницы
Promise.all( [profileInfoApi, objectsFromServerApi] )
  .then((results) => {
    //Обработка первого элемента данных из массива данных, полученных от сервера
    userInfo.setUserInfo(results[0]);
    //Обработка второго элемента данных из массива данных, полученных от сервера
    const sectionRendererForArray = (item) => {
      const card = new Card(item, cardData, callbacksForCard, userInfo.getUserInfo().profileId);
      sectionForArray.addArrayItem(card.generateCard());
    };
    const sectionForArray = new Section({
      data: results[1],
      renderer: sectionRendererForArray
      },
      cardData.containerSelector
      );
    sectionForArray.renderItems(); 
  })
  .catch(error => {
    alert(error);
  });

//Действия при нажатии на кнопку "Изменить" (Профиль)
function handleEditProfile() {
  popupProfileFormFullName.value = userInfo.getUserInfo().profileFullname;
  popupProfileFormProfession.value = userInfo.getUserInfo().profileProfession;
  validatorForProfile.enableValidation();
  popupWithFormProfile.open();
};

//Действия при нажатии на кнопку "Добавить" (Место)
function handleAddPlace() {
  validatorForPlace.enableValidation();
  popupWithFormPlace.open();
};

//Действия при нажатии на иконку с аватаром
function handleEditAvatar() {
  const popupWithFormAvatar = new PopupWithForm(popupData.popupAvatar, {
    formSubmitHandler: (inputValues, thisObject) => {
      popupWithFormAvatar.renderLoading(true, "Сохранение...");
      api.changeAvatar(inputValues.linktoavatar)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        popupWithFormAvatar.renderLoading(false);
        thisObject.close();
      });
    }
  });
  popupWithFormAvatar.open();
};


profileEditButton.addEventListener('click', handleEditProfile);
profileAddButton.addEventListener('click', handleAddPlace);
profileAvatar.addEventListener('click', handleEditAvatar);