import Api from "./api";
import BoardController from "./controllers/board-controller";
import {END_POINT} from "./const";

const api = new Api(END_POINT);

let container = document.querySelector(`.main`);
const boardController = new BoardController(container);

api.getImages().then((imagesData) => {
  boardController.render(imagesData);
});
