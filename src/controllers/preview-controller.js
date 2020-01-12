import Preview from "../components/preview";
import {render, RenderPosition} from "../utils/render";
import Api from "../api";
import {END_POINT, Key, SHAKE_ANIMATION_TIMEOUT} from "../const";
import Image from "../models/image";
import ModalImage from "../components/modal-image";

const parseFormData = (formData) => {
  return new Image({
    'comments': {
      'text': formData.get(`comment`),
      'date': new Date().getTime()
    }
  });
};

export default class PreviewController {

  constructor(container, imagesModel, onDataChange) {
    this._container = container;
    this._previewComponent = null;
    this._modalImageComponent = null;

    this._imageData = {};
    this._newImageData = {};
    this._onDataChange = onDataChange;

    this._mainContainerElement = document.querySelector(`.body`);
    this._modalElement = document.querySelector(`.modal`);
    this._overlayElement = document.querySelector(`.overlay`);
  }

  render(previewData) {
    this._previewComponent = new Preview(previewData);
    render(this._container.getElement(), this._previewComponent, RenderPosition.BEFOREEND);

    this._previewComponent.setImageClickHandler(() => {
      this._modalElement.classList.add(`modal--show`);
      this._overlayElement.classList.add('overlay--show');
      this._mainContainerElement.classList.add(`body--no-scroll`);

      const api = new Api(END_POINT);
      api.getImageInfo(this._previewComponent.getId()).then((imageData) => {
        this._imageData = imageData;
        this._newImageData = this._imageData;
        this._modalImageComponent = new ModalImage(imageData);
        render(this._modalElement, this._modalImageComponent, RenderPosition.BEFOREEND);
        this._setEventListenersToModalElements();
      });
    });
  }

  shake() {
    this._modalElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._modalElement.style.animation = ``;

      this._modalImageComponent.setNewSubmitButtonText(`Оставить комментарий`);
      this._modalImageComponent.disableOrUnableSubmitButton(false);
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  updateCommentField() {
    this._modalImageComponent.emptyCommentField();
    this._modalImageComponent.updateCommentField();
  }

  _setEventListenersToModalElements() {
    this._modalImageComponent.setButtonCloseClickHandler(() => {
      this._modalElement.classList.remove(`modal--show`);
      this._overlayElement.classList.remove('overlay--show');
      this._mainContainerElement.classList.remove(`body--no-scroll`);
      this._modalImageComponent.removeModalHandlers();
      this._modalElement.innerHTML = ``;
    });
    this._modalImageComponent.setButtonCloseEscHandler((evt) => {
      if (evt.key === Key.ESCAPE) {
        this._modalElement.classList.remove(`modal--show`);
        this._overlayElement.classList.remove('overlay--show');
        this._mainContainerElement.classList.remove(`body--no-scroll`);
        this._modalImageComponent.removeModalHandlers();
        this._modalElement.innerHTML = ``;
      }
    });
    this._modalImageComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._modalImageComponent.getData();
      const data = parseFormData(formData);
      this._updateImageData(data.comments);
      this._modalImageComponent.setNewSubmitButtonText(`Добавляем...`);
      this._modalImageComponent.disableOrUnableSubmitButton(true);
      this._onDataChange(
        this,
        this._modalImageComponent,
        Object.assign(
          {},
          this._imageData,
          this._newImageData
        ),
        this._imageData
      );
    });
  }

  _updateImageData(commentData) {
    this._newImageData.comments.push(commentData);
  }
}

