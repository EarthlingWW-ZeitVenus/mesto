export default class UserInfo {
  constructor( { fullnameSelector, professionSelector } ) {
    this._fullname = document.querySelector(fullnameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector('.profile__avatar');
    this._profileId = undefined;
  }


  //Возвращает данные профиля со страницы
  getUserInfo() {
    return {
      profileFullname: this._fullname.textContent,
      profileProfession: this._profession.textContent,
      profileAvatar: this._avatar.style.backgroundImage,
      profileId: this._profileId
    };
  }

  //Устанавливает переданные данные для профиля на страницу
  setUserInfo(userData) {
    this._fullname.textContent = userData.name;
    this._profession.textContent = userData.about;
    if (userData.avatar !== undefined)
      this._avatar.style.backgroundImage = `url(${userData.avatar})`;
    if (userData._id !== undefined)
      this._profileId = userData._id;
  }
}