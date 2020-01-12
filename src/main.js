import Api from "./api";
import BoardController from "./controllers/board-controller";
import {END_POINT} from "./const";
import Images from "./models/images";

const api = new Api(END_POINT);
const imagesModel = new Images();
const container = document.querySelector(`.main`);

api.getImages().then((imagesData) => {
  imagesModel.setImages(imagesData);
  const boardController = new BoardController(container, imagesModel, api);
  boardController.render();
});
