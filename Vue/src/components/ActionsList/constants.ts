import { EContentType as EEvents } from '@/constants';


const BUTTONS_ORDER = [
  EEvents.INIT,
  EEvents.VACATION,
  EEvents.TIME,
  EEvents.REASONS,
  EEvents.EXIT
];

const BUTTONS_TEXTS_DATA: Record<EEvents, string | { active: string, disabled: string }> = {
  [EEvents.INIT]: 'Запуск',
  [EEvents.VACATION]: 'Выйти на каникулы',
  [EEvents.TIME]: {
    disabled: 'Отслеживать время',
    active: 'Прекратить отслеживание времени',
  },
  [EEvents.REASONS]: 'Скажи, почему не научился жить один?',
  [EEvents.EXIT]: 'Завершить сеанс',
};


export { BUTTONS_ORDER, BUTTONS_TEXTS_DATA };
