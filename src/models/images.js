export default class Images {

  constructor() {
    this._images = [];
  }

  getImages() {
    return this._images;
  }

  setImages(images) {
    this._images = Array.from(images);
  }

  updateImage(id, image) {
    const index = this._images.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._images = [].concat(this._images.slice(0, index), image, this._images.slice(index + 1));

    return true;
  }
}
