import Preview from "../components/preview";
import {render, RenderPosition} from "../utils/render";

export default class PreviewController {

  constructor(container) {
    this._container = container;
    this._previewComponent = null;
  }

  render(previewData) {
    this._previewComponent = new Preview(previewData);
    render(this._container.getElement(), this._previewComponent, RenderPosition.BEFOREEND);

    // TODO: add listeners to close button and form
  }
}

