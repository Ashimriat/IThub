class Drawer extends ContentController {
  constructor(selector) {
    super(selector)
  }

  #createElement(tag, id, text) {
    const elem = document.createElement(tag);
    if (id) {
      elem.id = id;
    }
    if (text) {
      elem.textContent = text;
    }
    return elem;
  } 

  updateInnerElement(target, callback) {
    const elem = typeof target === 'string' ? this.container.querySelector(target) : target;
    if (!elem) {
      return;
    }
    callback(elem);
  }

  createButton(id, text) {
    return this.#createElement('button', id, text);
  }

  createContainer(id) {
    return this.#createElement('div', id);
  }

  createTitle(id, text) {
    return this.#createElement('h2', id, text);
  }

  createListItem(itemContent) {
    return this.#createElement('li', '', itemContent);
  }

  createList(type, items = []) {
    const list = document.createElement(type);
    for (const item of items) {
      this.append(this.createListItem(item), list);
    }
    return list;
  }

  createParagraph(text) {
    return this.#createElement('p', '', text);
  }
}