class AppOperator {
  #terminalOperator
  #actionsListOperator

  constructor() {
    this.#terminalOperator = new TerminalOperator();
    this.#actionsListOperator = new ActionsListOperator(this.#processButton.bind(this));
  }
  
  async #processButton(e) {
    if (!e.target) return;
    e.stopPropagation();
    e.stopImmediatePropagation();
    switch (e.target.id) {
      case BUTTONS.INIT:
        this.#terminalOperator.processInit();
        this.#actionsListOperator.processInit();
        break;
      case BUTTONS.VACATION:
        this.#actionsListOperator.setAllActionsAvailability(false);
        await this.#terminalOperator.displayVacation();
        this.#actionsListOperator.setAllActionsAvailability(true);
        break;
      case BUTTONS.TIME:
        this.#terminalOperator.handleTimeCall();
        this.#actionsListOperator.handleTimeCall();
        break;
      case BUTTONS.REASONS: {
        const isShowedEverything = this.#terminalOperator.showReasons();
        this.#actionsListOperator.toggleReasons(!isShowedEverything);
      }
        break;
      case BUTTONS.EXIT:
        this.#actionsListOperator.setAllActionsAvailability(false);
        await this.#terminalOperator.processExit();
        this.#actionsListOperator.processExit();
      default:
        break;
    }
  }

  init() {
    this.#actionsListOperator.initActions();
  }
}