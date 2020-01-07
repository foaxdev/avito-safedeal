import ModalImage from "../components/modal-image";
import {render, RenderPosition} from "../utils/render";

export default class ModalImageController {

  constructor(container) {
    this._container = container;
    this._modalImageComponent = null;
  }

  render(fullImageData) {
    this._modalImageComponent = new ModalImage(fullImageData);
    render(this._container, this._modalImageComponent, RenderPosition.BEFOREEND);
  }
}
