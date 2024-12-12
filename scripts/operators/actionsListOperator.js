class ActionsListOperator {
  #buttonsOperator;
  #drawer = new Drawer('#buttonsList');

  constructor(buttonsOperator) {
    this.#buttonsOperator = buttonsOperator;
  }

  setAllActionsAvailability(status) {
    for (const button of this.#buttonsOperator.buttons) {
      button.disabled = !status;
    }
  }
  
  processInit() {
    this.#buttonsOperator.reset();
    this.#drawer.resetContent();
    for (const [buttonId, buttonText] of Object.entries(ButtonsOperator.processedButtons)) {
      if (buttonId === BUTTONS.INIT) continue;
      this.#drawer.addContent(this.#drawer.createButton(buttonId, buttonText));
    }
    this.#buttonsOperator.init();
  }
  

  handleTimeCall() {
    this.#drawer.updateInnerElement(
      this.#buttonsOperator.buttonsDict[BUTTONS.TIME],
      (button) => {
        const isLaunched = !!button.getAttribute('data-is-launched');
        button.textContent = !isLaunched ? 'Прекратить отслеживание времени' : 'Отслеживать время';
        if (isLaunched) {
          button.removeAttribute('data-is-launched');
        } else {
          button.setAttribute('data-is-launched', 'true');
        }
      }
    )
  }

  toggleReasons(to) {
    this.#drawer.updateInnerElement(
      this.#buttonsOperator.buttonsDict[BUTTONS.REASONS],
      (button) => {
        button.disabled = !to;
      }
    );
  }

  processExit() {
    this.#buttonsOperator.reset();
    this.#drawer.setContent(
      this.#drawer.createButton(BUTTONS.INIT, ButtonsOperator.processedButtons[BUTTONS.INIT])
    );
    this.#buttonsOperator.init();
  }
}