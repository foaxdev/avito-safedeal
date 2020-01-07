import image from "../models/image";
import {Method} from "../const";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {

  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  getImages() {
    return this._load({url: `images`})
      .then((response) => response.json())
      .then(Image.parseImages);
  }

  getImageInfo(id) {
    return this._load({url: `images/${id}`})
      .then((response) => response.json())
      .then(Image.parseImages);
  }

  // TODO: comment send
  createComment(comment, imageId) {
    return this._load({
      url: `images/${imageId}/comments`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Image.parseImage);
  }

  _load({url, method = Method.GET, body = null}) {
    return fetch(`${this._endPoint}/${url}`, {method, body})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
