import Previews from "../components/previews";
import {render, RenderPosition} from "../utils/render";
import PreviewController from "./preview-controller";

const renderImages = (imagesPreviewData, previewsContainer) => {
  return imagesPreviewData.map((imagePreviewData) => {
    const previewController = new PreviewController(previewsContainer);
    previewController.render(imagePreviewData);

    return previewController;
  });
};

export default class BoardController {

  constructor(container) {
    this._container = container;
    this._previewsComponent = null;
  }

  render(imagesPreviewData) {
    this._previewsComponent = new Previews();
    render(this._container, this._previewsComponent, RenderPosition.BEFOREEND);
    renderImages(imagesPreviewData, this._previewsComponent);
  }
}
