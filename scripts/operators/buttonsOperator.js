const BUTTONS = {
  INIT: 'init',
  VACATION: 'vacation',
  TIME: 'time',
  REASONS: 'reasons',
  EXIT: 'exit'
};

class ButtonsOperator {
  static processedButtons = {
    [BUTTONS.INIT]: 'Запуск',
    [BUTTONS.VACATION]: 'Выйти на каникулы',
    [BUTTONS.TIME]: 'Отслеживать время',
    [BUTTONS.REASONS]: 'Скажи, почему не научился жить один?',
    [BUTTONS.EXIT]: 'Завершить сессию',
  };

  #listener
  #buttons = [];

  constructor(listener) {
    this.#listener = listener;
  }

  get buttons() {
    return this.#buttons;
  }

  get buttonsDict() {
    return this.#buttons.reduce((acc, val) => {
      acc[val.getAttribute('id')] = val;
      return acc;
    }, {});
  }

  reset() {
    for (const button of this.#buttons) {
      button.removeEventListener('click', this.#listener);
    }
    this.#buttons = [];
  }

  init() {
    for (const button of document.querySelectorAll('button')) {
      button.addEventListener('click', this.#listener);
      this.#buttons.push(button);
    }
  }
}