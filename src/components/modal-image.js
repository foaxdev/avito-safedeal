import AbstractComponent from "./abstract-component";
import {createItems} from "../utils/render";
import moment from "moment";

const getCommentHtml = (commentData) => {
  const date = moment(commentData.date).format(`DD.MM.YYYY`);
  const datetime = moment(commentData.date).format(`YYYY-MM-DDThh:mm:ssTZD`);

  return(`
    <li class="comments-list__items" data-id="${commentData.id}">
      <time class="comments-list__date" datetime="${datetime}">${date}</time>
      <p class="comments-list__comment">${commentData.text}</p>
    </li>
  `);
};

const createModalImageTemplate = (imageData) => {
  return (`
    <div class="image">
      <button class="image__toggle" type="button">Закрыть окно
        <svg width="18" height="18" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><line x1="1.35355" y1="0.646447" x2="19.3536" y2="18.6464"/><line x1="0.646447" y1="18.6464" x2="18.6464" y2="0.646446"/></svg>
      </button>
      <img class="image__full-image" src="${imageData.url}" alt="Большое изображение">
      <ul class="comments-list">${createItems(imageData.comments, getCommentHtml)}</ul>
      <form class="comment-form" method="post" autocomplete="off">
        <input class="comment-form__name" name="name" type="text" placeholder="Ваше имя" aria-label="Введите ваше имя">
        <input class="comment-form__comment" name="comment" type="text" placeholder="Ваш комментарий" aria-label="Введите комментарий">
        <button class="comment-form__submit-button" type="submit">Оставить комментарий</button>
      </form>
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
    document.addEventListener(`keydown`, handler);
    this._onCloseButtonEsc = handler;
  }

  setFormSubmitHandler(handler) {
    this.getElement().querySelector(`.comment-form`).addEventListener(`submit`, handler);
    this._onFormSubmit = handler;
  }

  removeModalHandlers() {
    this.getElement().querySelector(`.image__toggle`).removeEventListener(`click`, this._onCloseButtonEsc);
    document.removeEventListener(`keydown`, this._onCloseButtonClick);
    this.getElement().querySelector(`.comment-form`).removeEventListener(`submit`, this._onFormSubmit);
  }
}
