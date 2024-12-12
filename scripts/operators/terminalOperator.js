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
    } catch (e) {
      resultText = TerminalOperator.VACATION_DATA.fail;
      resultColor = 'var(--red)';
    } finally {
      this.#contentDrawer.updateInnerElement(text, (elem) => {
        elem.textContent = resultText;
        elem.setAttribute('style', `font-weight: 600; color: ${resultColor}`);
      });
    }
  }

  handleTimeCall() {
    if (this.#timerIntervalId === null) {
      this.#updateTimer();
      this.#timerIntervalId = setInterval(() => this.#updateTimer(), 1000);
    } else {
      clearInterval(this.#timerIntervalId);
      this.#timerIntervalId = null;
      this.#timerDrawer.resetContent();
    }
  }  
  
  #updateTimer() {
    const date = new Date();
    const hours = date.getHours();
    const h = hours < 10 ? `0${hours}` : hours;
    const minutes = date.getMinutes();
    const m = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = date.getSeconds();
    const s = seconds < 10 ? `0${seconds}` : seconds;
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
      this.#createTitle('Завершаю сессию. Спасибо за визит!')
    );
    const loaderContainer = this.#contentDrawer.createContainer('loaderContainer');
    const loader = this.#contentDrawer.createContainer('loader');
    this.#contentDrawer.append(loader, loaderContainer);
    this.#contentDrawer.addContent(loaderContainer);
    await wait(5_000, 5, (step) => {
      loader.setAttribute('style', `--progress: ${100 * (step + 1) / 5}%`);
    });
    this.#contentDrawer.resetContent();
  }
}