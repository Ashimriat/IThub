class ContentController {
  #container

  constructor(selector) {
    this.#container = document.querySelector(selector);
  }

  get container() {
    return this.#container;
  }

  resetContent() {
    this.#container.innerHTML = '';
  }

  setContent(content) {
    this.resetContent();
    this.addContent(content);
  }

  append(elem, target) {
    target.appendChild(elem);
  }

  addContent(content) {
    for (const contentElem of makeArray(content)) {
      this.#container.appendChild(contentElem);
    }
  }
}