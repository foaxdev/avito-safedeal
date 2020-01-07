export default class Image {

  constructor(data) {
    this.id = data[`id`];
    this.url = data[`url`];
    this.comments = data[`comments`];
  }

  static parseImage(data) {
    return new Image(data);
  }

  static parseImages(data) {
    return data.map(Image.parseImage);
  }
}
