type Arrayable<T> = T | T[];

const makeArray = <T>(src: Arrayable<T>): T[] => Array.isArray(src) ? src : [src];

const wait = (
  time: number,
  steps = 1,
  stepProcessor: (step: number) => void = () => {},
  omitError = true,
): Promise<void> => new Promise((res, rej) => {
  let counter = 0;
  let usedTime = time ?? (Math.random() || 1) * 1000;
  let usedSteps = steps || 1;
  let timerId: ReturnType<typeof setTimeout>;
  (function handler() {
    timerId = setTimeout(() => {
      clearTimeout(timerId);
      if (counter <= steps - 1) {
        stepProcessor(counter);
      }
      counter++;
      if (counter <= steps) {
        handler();
      } else if (Math.round(Math.random()) === 1 || omitError) {
        res();
      } else {
        rej();
      }
    }, usedTime / usedSteps);
  })();
});

type ListTagType = 'ol' | 'ul';

type List<T extends ListTagType> = T extends 'ol' ? HTMLOListElement : HTMLUListElement;

class ContentController {
  #container!: HTMLElement;

  constructor(selector: string) {
    this.#container = document.querySelector(selector) as HTMLElement;
  }

  get container(): HTMLElement {
    return this.#container;
  }

  resetContent() {
    this.#container.innerHTML = '';
  }

  setContent(content: Arrayable<HTMLElement>) {
    this.resetContent();
    this.addContent(content);
  }

  append(elem: HTMLElement, target: HTMLElement): void {
    target.appendChild(elem);
  }

  addContent(content: Arrayable<HTMLElement>) {
    for (const contentElem of makeArray(content)) {
      this.#container.appendChild(contentElem);
    }
  }
}

class Drawer extends ContentController {
  constructor(selector: string) {
    super(selector)
  }

  #createElement<T extends HTMLElement>(tag: string, id?: string, text?: string): T {
    const elem = document.createElement(tag) as T;
    if (id) {
      elem.id = id;
    }
    if (text) {
      elem.textContent = text;
    }
    return elem;
  } 

  updateInnerElement<T extends HTMLElement>(target: string | T, callback: (elem: T) => void) {
    const elem: T | null = typeof target === 'string' ? this.container.querySelector(target) : target;
    if (!elem) {
      return;
    }
    callback(elem);
  }

  createButton(id: string, text: string): HTMLButtonElement {
    return this.#createElement<HTMLButtonElement>('button', id, text);
  }

  createContainer(id?: string): HTMLDivElement {
    return this.#createElement<HTMLDivElement>('div', id);
  }

  createTitle(id: string, text: string): HTMLHeadingElement {
    return this.#createElement<HTMLHeadingElement>('h2', id, text);
  }

  createListItem(itemContent: string): HTMLLIElement {
    return this.#createElement<HTMLLIElement>('li', '', itemContent);
  }

  createList<T extends 'ol' | 'ul'>(type: 'ol' | 'ul', items: string[] = []): List<T> {
    const list = document.createElement(type) as List<T>;
    for (const item of items) {
      this.append(this.createListItem(item), list);
    }
    return list;
  }

  createParagraph(text: string): HTMLParagraphElement {
    return this.#createElement<HTMLParagraphElement>('p', '', text);
  }
}


class TerminalOperator {
  static REASONS_LIST = [
    'Ты.',
    'Все твои мечты.',
    'Все твои слова; я им не поверил едва.',
    'Ложь: кто прав, кто виноват - не разберёшь.',
    'Боль. От того, что умерла любовь.'
  ];
  static VACATION_DATA = {
    initial: 'Начинаем процесс подготовки',
    steps: [
      'Зазываем друзей...',
      'Упаковываем вещи...',
      'Проверяем оценки...'      
    ],
    success: 'Море ждёт нас!',
    fail: 'А сессию закрывать кто будем?!'
  };

  #reasonsGenerator: Generator<undefined, void, unknown> | null = null;
  #contentDrawer = new Drawer('#content');
  #timerDrawer = new Drawer('#time');
  #timerIntervalId: ReturnType<typeof setInterval> | null = null;

  #createTitle(text: string): HTMLHeadingElement {
    return this.#contentDrawer.createTitle('terminalTitle', text);
  }

  processInit() {
    this.#contentDrawer.setContent(this.#createTitle('Добро пожаловать в терминал!'));
    this.#contentDrawer.addContent(this.#contentDrawer.createParagraph('Ждём ваших указаний'))
  }
  
  async displayVacation() {
    this.#contentDrawer.setContent(this.#createTitle('Собираемся на каникулы'));
    const text = this.#contentDrawer.createParagraph(TerminalOperator.VACATION_DATA.initial);
    this.#contentDrawer.addContent(text);
    let resultText!: string;
    let resultColor!: string;
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
  
  *#initReasonsGenerator() {
    this.#contentDrawer.setContent(this.#createTitle('У меня на это пять причин'));
    yield;
    const list = this.#contentDrawer.createList('ol');
    this.#contentDrawer.addContent(list);
    for (let i = 0; i < TerminalOperator.REASONS_LIST.length; i++) {
      this.#contentDrawer.append(this.#contentDrawer.createListItem(TerminalOperator.REASONS_LIST[i]), list);
      if (i !== TerminalOperator.REASONS_LIST.length - 1) yield;
    }
  }

  showReasons(): boolean {
    if (!this.#reasonsGenerator) {
      this.#reasonsGenerator = this.#initReasonsGenerator();
    }
    const result = !!this.#reasonsGenerator.next().done;
    if (result) {
      this.#reasonsGenerator = null;
    }
    return result;
  }

  async processExit() {
    this.#contentDrawer.setContent(
      this.#createTitle('Завершаю сеанс. Спасибо за визит!')
    );
    await wait(5_000);
  }
}

type ButtonClickListener = (e: PointerEvent | MouseEvent) => void;

const BUTTONS = {
  INIT: 'init',
  VACATION: 'vacation',
  TIME: 'time',
  REASONS: 'reasons',
  EXIT: 'exit'
} as const;
type ButtonType = typeof BUTTONS[keyof typeof BUTTONS];

class ActionsListOperator {
  static processedButtons = {
    [BUTTONS.INIT]: 'Запуск',
    [BUTTONS.VACATION]: 'Выйти на каникулы',
    [BUTTONS.TIME]: 'Отслеживать время',
    [BUTTONS.REASONS]: 'Скажи, почему не научился жить один?',
    [BUTTONS.EXIT]: 'Завершить сеанс',
  };

  #listener!: ButtonClickListener;
  #buttons: HTMLButtonElement[] = [];
  #drawer = new Drawer('#buttonsList');

  constructor(listener: ButtonClickListener) {
    this.#listener = listener;
  }

  get #buttonsDict(): Record<ButtonType, HTMLButtonElement> {
    return this.#buttons.reduce((acc, val) => {
      acc[val.getAttribute('id') as ButtonType] = val;
      return acc;
    }, <Record<ButtonType, HTMLButtonElement>>{});
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

  setAllActionsAvailability(status: boolean) {
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
    this.#drawer.updateInnerElement<HTMLButtonElement>(
      this.#buttonsDict[BUTTONS.TIME],
      (button) => {
        const isLaunched = !!button.getAttribute('data-is-launched')
        button.textContent = !isLaunched ? 'Прекратить отслеживание времени' : 'Отслеживать время'
        if (isLaunched) {
          button.removeAttribute('data-is-launched');
        } else {
          button.setAttribute('data-is-launched', 'true');
        }
      }
    )
  }

  toggleReasons(to: boolean) {
    this.#drawer.updateInnerElement<HTMLButtonElement>(
      this.#buttonsDict[BUTTONS.REASONS],
      (button) => {
        button.disabled = !to;
      }
    );
  }

  processExit() {
    this.#resetActions();
    this.#drawer.setContent(
      this.#drawer.createButton(BUTTONS.INIT, ActionsListOperator.processedButtons[BUTTONS.INIT])
    );
    this.initActions();
  }
}

class AppOperator {
  #terminalOperator!: TerminalOperator;
  #actionsListOperator!: ActionsListOperator;

  constructor() {
    this.#terminalOperator = new TerminalOperator();
    this.#actionsListOperator = new ActionsListOperator(this.#processButton.bind(this));
  }
  
  async #processButton(e: PointerEvent | MouseEvent): Promise<void> {
    if (!e.target) return;
    e.stopPropagation();
    e.stopImmediatePropagation();
    switch ((<HTMLButtonElement>e.target).id as ButtonType) {
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

  init(): void {
    this.#actionsListOperator.initActions();
  }
}


const appOperator = new AppOperator();
appOperator.init();
