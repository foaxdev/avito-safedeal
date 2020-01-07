import Preview from "../components/preview";
import {render, RenderPosition} from "../utils/render";
import ModalImage from "../components/modal-image";
import Api from "../api";
import {END_POINT, Key} from "../const";

export default class PreviewController {

  constructor(container) {
    this._container = container;
    this._previewComponent = null;
    this._modalImageComponent = null;
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
        this._modalImageComponent = new ModalImage(imageData);
        render(this._modalElement, this._modalImageComponent, RenderPosition.BEFOREEND);
        this._setEventListenersToModalElements();
      });
    });
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
  }
}

