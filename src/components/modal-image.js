import AbstractComponent from "./abstract-component";
import {createItems} from "../utils/render";

const getCommentHtml = (imageData) => {
  return(`
    <li class="comments-list__items">
    <!-- TODO: format dates -->
      <time class="comments-list__date" datetime="${imageData.date}">{imageData.date}</time>
      <p class="comments-list__comment">${imageData.text}</p>
    </li>
  `);
};

const createModalImageTemplate = (imageData) => {
  return (`
    <div class="image">
      <button class="image__toggle" type="button">Закрыть окно</button>
      <img class="image__full-image" src="${imageData.url}" alt="Большое изображение">
      <form class="comment-form" method="post" autocomplete="off">
        <input class="comment-form__name" name="name" type="text" placeholder="Ваше имя" aria-label="Введите ваше имя">
        <input class="comment-form__comment" name="comment" type="text" placeholder="Ваш комментарий" aria-label="Введите комментарий">
        <button class="comment-form__submit-button" type="submit">Оставить комментарий</button>
      </form>
      <ul class="comments-list">${createItems(imageData.comments, getCommentHtml)}</ul>
     </div>
  `);
};

export default class ModalImage extends AbstractComponent {

  constructor(imageData) {
    super();

    this._imageData = imageData;
    this._onCloseButtonClick = null;
    this._onCloseButtonEsc = null;
    this._onFormSubmit = null;
  }

  getTemplate() {
    return createModalImageTemplate(this._imageData);
  }

  setButtonCloseClickHandler(handler) {
    this.getElement().querySelector(`.image__toggle`).addEventListener(`click`, handler);
    this._onCloseButtonClick = handler;
  }

  setButtonCloseEscHandler(handler) {
    this.getElement().querySelector(`.image__toggle`).addEventListener(`keydown`, handler);
    this._onCloseButtonEsc = handler;
  }

  setFormSubmitHandler(handler) {
    this.getElement().querySelector(`.comment-form`).addEventListener(`keydown`, handler);
    this._onFormSubmit = handler;
  }

  removeModalHandlers() {
    this.getElement().querySelector(`.image__toggle`).removeEventListener(`keydown`, this._onCloseButtonEsc);
    this.getElement().querySelector(`.image__toggle`).removeEventListener(`keydown`, this._onCloseButtonClick);
    this.getElement().querySelector(`.comment-form`).removeEventListener(`keydown`, this._onFormSubmit);
  }
}
