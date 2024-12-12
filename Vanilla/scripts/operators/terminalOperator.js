class TerminalOperator {
  static REASONS_LIST = [
    'Ты.',
    'Все твои мечты.',
    'Все твои слова; я им не поверил едва.',
    'Ложь: кто прав, кто виноват - не разберёшь.',
    'Боль. От того, что умерла любовь.'
  ];
  static VACATION_DATA = {
    initial: 'Начинаем процесс подготовки...',
    steps: [
      'Зазываем друзей...',
      'Упаковываем вещи...',
      'Проверяем оценки...'      
    ],
    success: 'Море ждёт нас!',
    fail: 'А сессию закрывать кто будет?!'
  };

  #reasonsGenerator = null;
  #contentDrawer = new Drawer('#content');
  #timerDrawer = new Drawer('#timer');
  #timerIntervalId = null;

  #createTitle(text) {
    return this.#contentDrawer.createTitle('terminalTitle', text);
  }

  processInit() {
    this.#contentDrawer.setContent(this.#createTitle('Добро пожаловать в терминал!'));
    this.#contentDrawer.addContent(this.#contentDrawer.createParagraph('Ждём ваших указаний'))
  }
  
  async displayVacation() {
    this.#reasonsGenerator = null;
    this.#contentDrawer.setContent(this.#createTitle('Собираемся на каникулы'));
    const text = this.#contentDrawer.createParagraph(TerminalOperator.VACATION_DATA.initial);
    this.#contentDrawer.addContent(text);
    let resultText;
    let resultColor;
    try {
      await wait(15_000, 3, (step) => {
        this.#contentDrawer.updateInnerElement(text, (elem) => {
          elem.textContent = TerminalOperator.VACATION_DATA.steps[step]; 
        });
      }, false);
      resultText = TerminalOperator.VACATION_DATA.success;
      resultColor = 'var(--greenM)';
    } finally {
      this.#contentDrawer.updateInnerElement(text, (elem) => {
        elem.textContent = resultText;
        elem.setAttribute('style', `font-weight: 600; color: ${resultColor}`);
      });
    }
  }

  handleTimeCall() {
    if (this.#timerIntervalId === null) {
      this.#timerIntervalId = setTimeout(() => this.#updateTimer(), 3_000);
    } else {
      clearTimeout(this.#timerIntervalId);
      this.#timerIntervalId = null;
      this.#timerDrawer.resetContent();
    }
  }  
  
  #updateTimer() {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    this.#timerDrawer.setContent(
      this.#timerDrawer.createParagraph(`Текущее время: ${h}:${m}:${s}`)
    );
  }
  
  #initReasonsGenerator() {
    this.#reasonsGenerator = (function* () {
      this.#contentDrawer.setContent(this.#createTitle('У меня на это пять причин'));
      yield;
      const list = this.#contentDrawer.createList('ol');
      this.#contentDrawer.addContent(list);
      for (let i = 0; i < TerminalOperator.REASONS_LIST.length; i++) {
        this.#contentDrawer.append(this.#contentDrawer.createListItem(TerminalOperator.REASONS_LIST[i]), list);
        if (i !== TerminalOperator.REASONS_LIST.length - 1) yield;
      }
    }).call(this);
  }

  showReasons() {
    if (!this.#reasonsGenerator) {
      this.#initReasonsGenerator();
    }
    const result = !!this.#reasonsGenerator.next().done;
    if (result) {
      this.#reasonsGenerator = null;
    }
    return result;
  }

  async processExit() {
    this.#reasonsGenerator = null;
    this.#contentDrawer.setContent(
      this.#createTitle('Завершаю сеанс. Спасибо за визит!')
    );
    const loaderContainer = this.#contentDrawer.createContainer('loaderContainer');
    const loader = this.#contentDrawer.createContainer('loader');
    this.#contentDrawer.append(loader, loaderContainer);
    this.#contentDrawer.addContent(loaderContainer);
    await wait(5_000, 5, (step) => {
      loader.setAttribute('style', `--progress: ${1 * (step + 1) / 5}%`);
    });
    this.#contentDrawer.resetContent();
  }
}