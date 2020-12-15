export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialData = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }


  //Добавляет массив элементов на страницу
  renderItems() {
    this._initialData.forEach(item => this._renderer(item));
  }

  //ToReview: Вы писали: - "Хотя у Вас и заданы различные методы для рендера на экран массива карточек и одной новой
  //карточки (append и prepend), массив карточек рендерится в обратном порядке к тому массиву, который у Вас задан
  //(а методом append должен в прямом). Нужно разобраться почему так и устранить ошибку.

  // - Это потому что проверка в методе addItem происходит над аргументом переданным конструктору класса, а не аргументом
  //Переданным методу addItem. Ошибка самоустранитца - я уберу проверку на массивы из кода.

  //Добавляет элементы на страницу
  addItem(element) {
    this._container.prepend(element);
  }
}