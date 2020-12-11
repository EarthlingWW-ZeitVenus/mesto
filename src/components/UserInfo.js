export default class UserInfo {
  constructor( { fullnameSelector, professionSelector } ) {
    this._fullname = document.querySelector(fullnameSelector);
    this._profession = document.querySelector(professionSelector);
  }


  //Возвращает данные профиля со страницы
  getUserInfo() {
    return {
      docProfileFullname: this._fullname.textContent,
      docProfileProfession: this._profession.textContent
    };
  }

  //Устанавливает переданные, как параметр данные, на страницу
  setUserInfo(fullnameInfo, professionInfo) {
    this._fullname.textContent = fullnameInfo;
    this._profession.textContent = professionInfo;
  }
}