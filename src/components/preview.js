import AbstractComponent from "./abstract-component";

const createPreviewTemplate = (imageData) => {
  return (`
    <li class="preview-list__item" data-id="${imageData.id}">
      <img class="preview-list__image" src="${imageData.url}" alt="Превью изображения">
     </li>
  `);
};

export default class Preview extends AbstractComponent {

  constructor(imageData) {
    super();

    this._imageData = imageData;
  }

  getId() {
    return this._imageData.id;
  }

  getTemplate() {
    return createPreviewTemplate(this._imageData);
  }

  setImageClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
