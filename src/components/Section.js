export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialData = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }


  //Исполняет код колбек функции(которая создает из массива с данными, массив DOM-элементов, наполняет и добавляет
  // их на страницу)
  renderItems() {
    this._initialData.forEach(item => this._renderer(item));
  }

  // Добавляет элементы массива, переданного в класс как параметр, на страницу
  addArrayItem(arrayElement) {
    this._container.append(arrayElement);
  }

  //Добавляет элемент, переданный как параметр в функцию-метод класса, на станицу
  addItem(element) {
    this._container.prepend(element);
  }
}