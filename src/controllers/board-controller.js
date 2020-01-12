import Previews from "../components/previews";
import {render, RenderPosition} from "../utils/render";
import PreviewController from "./preview-controller";
import image from "../models/image";

const renderImages = (imagesPreviewData, previewsContainer, imagesModel, onDataChange) => {
  return imagesPreviewData.map((imagePreviewData) => {
    const previewController = new PreviewController(previewsContainer, imagesModel, onDataChange);
    previewController.render(imagePreviewData);

    return previewController;
  });
};

export default class BoardController {

  constructor(container, imagesModel, api) {
    this._container = container;
    this._imagesModel = imagesModel;
    this._previewsComponent = null;
    this._api = api;
  }

  render() {
    const images = this._imagesModel.getImages();
    this._previewsComponent = new Previews();
    render(this._container, this._previewsComponent, RenderPosition.BEFOREEND);
    renderImages(images, this._previewsComponent, this._imagesModel, this._onDataChange.bind(this));
  }

  _onDataChange(previewController, imageModalComponent, newImageData, oldImageData) {
    this._api.updateImage(oldImageData.id, newImageData)
      .then((imagesModel) => {
        const isSuccess = imagesModel.updateImage(oldImageData.id, newImageData);

        if (isSuccess) {
          imageModalComponent.updateData(imagesModel.getImages());
          previewController.updateCommentField();
        }
        imageModalComponent.disableOrUnableSubmitButton(false);
      })
      .catch(() => {
        previewController.shake();
      });
  }
}
