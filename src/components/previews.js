import AbstractComponent from "./abstract-component";

const createPreviewsTemplate = () => {
  return (`
    <ul class="preview-list"></ul>
  `);
};

export default class Previews extends AbstractComponent {

  getTemplate() {
    return createPreviewsTemplate();
  }
}
