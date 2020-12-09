export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialData = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._isArray = Array.isArray(this._initialData);
  }


  //Создает элементы, наполняет и добавляет на станицу, сразу несколько или поштучно
  renderItems() {
    if(this._isArray) {
      this._initialData.forEach(item => {
        this._renderer(item);
      });
    }
    else {
      this._renderer(item);
    }
  }

  //Добавляет элементы на станицу, сразу несколько или поштучно
  addItem(element) {
    if(this._isArray)
      this._container.append(element)
    else
      this._container.prepend(element);
  }
}