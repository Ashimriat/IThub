const BUTTONS = {
  INIT: 'init',
  VACATION: 'vacation',
  TIME: 'time',
  REASONS: 'reasons',
  EXIT: 'exit'
};

class ActionsListOperator {
  static processedButtons = {
    [BUTTONS.INIT]: 'Запуск',
    [BUTTONS.VACATION]: 'Выйти на каникулы',
    [BUTTONS.TIME]: 'Отслеживать время',
    [BUTTONS.REASONS]: 'Скажи, почему не научился жить один?',
    [BUTTONS.EXIT]: 'Завершить сессию',
  };

  #listener
  #buttons = [];
  #drawer = new Drawer('#buttonsList');

  constructor(listener) {
    this.#listener = listener;
  }

  get #buttonsDict() {
    return this.#buttons.reduce((acc, val) => {
      acc[val.getAttribute('id')] = val;
      return acc;
    }, {});
  }

  #resetActions() {
    for (const button of this.#buttons) {
      button.removeEventListener('click', this.#listener);
    }
    this.#buttons = [];
  }

  initActions() {
    for (const button of document.querySelectorAll('button')) {
      button.addEventListener('click', this.#listener);
      this.#buttons.push(button);
    }
  }

  setAllActionsAvailability(status) {
    for (const button of this.#buttons) {
      button.disabled = !status;
    }
  }

  processInit() {
    this.#resetActions();
    this.#drawer.resetContent();
    for (const [buttonId, buttonText] of Object.entries(ActionsListOperator.processedButtons)) {
      if (buttonId === BUTTONS.INIT) continue;
      this.#drawer.addContent(this.#drawer.createButton(buttonId, buttonText));
    }
    this.initActions();
  }

  handleTimeCall() {
    this.#drawer.updateInnerElement(
      this.#buttonsDict[BUTTONS.TIME],
      (button) => {
        const isLaunched = !!button.getAttribute('data-is-launched')
        button.textContent = !isLaunched ? 'Прекратить отслеживание времени' : 'Отслеживать время'
        button.setAttribute('data-is-launched', `${!isLaunched}`);
      }
    )
  }

  toggleReasons(to) {
    this.#drawer.updateInnerElement(
      this.#buttonsDict[BUTTONS.REASONS],
      (button) => {
        button.disabled = to;
      }
    );
  }

  processExit() {
    this.#drawer.setContent(
      this.#drawer.createButton(BUTTONS.INIT, ActionsListOperator.processedButtons[BUTTONS.INIT])
    );
    this.initActions();
  }
}