import Preview from "../components/preview";
import {render, RenderPosition} from "../utils/render";
import ModalImage from "../components/modal-image";
import Api from "../api";
import {END_POINT} from "../const";

export default class PreviewController {

  constructor(container) {
    this._container = container;
    this._previewComponent = null;
    this._modalImageComponent = null;
  }

  render(previewData) {
    this._previewComponent = new Preview(previewData);
    render(this._container.getElement(), this._previewComponent, RenderPosition.BEFOREEND);

    this._previewComponent.setImageClickHandler(() => {
      const mainContainer = document.querySelector(`.body`);
      const modal = document.querySelector(`.modal`);
      const overlay = document.querySelector(`.overlay`);
      modal.classList.add(`modal--show`);
      overlay.classList.add('overlay--show');
      mainContainer.classList.add(`body--no-scroll`);

      const api = new Api(END_POINT);
      api.getImageInfo(this._previewComponent.getId()).then((imageData) => {
        this._modalImageComponent = new ModalImage(imageData);
        render(modal, this._modalImageComponent, RenderPosition.BEFOREEND);
        // TODO: set event listeners
      });
    });
  }
}

