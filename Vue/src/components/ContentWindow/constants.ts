import type { ContentType } from './types';
import { EContentType } from '@/constants';

const REASONS_LIST = [
  'Ты.',
  'Все твои мечты.',
  'Все твои слова; я им не поверил едва.',
  'Ложь: кто прав, кто виноват - не разберёшь.',
  'Боль. От того, что умерла любовь.'
];
const VACATION_DATA = {
  initial: 'Начинаем процесс подготовки...',
  steps: [
    'Зазываем друзей...',
    'Упаковываем вещи...',
    'Проверяем оценки...'      
  ],
  success: 'Море ждёт нас!',
  fail: 'А сессию закрывать кто будет?!'
};
const CONTENT_TITLES: Record<ContentType, string> = {
  [EContentType.INIT]: 'Добро пожаловать в терминал!',
  [EContentType.VACATION]: 'Собираемся на каникулы',
  [EContentType.REASONS]: 'У меня на это пять причин',
  [EContentType.EXIT]: 'Завершаю сеанс. Спасибо за визит!',
};


export { REASONS_LIST, VACATION_DATA, CONTENT_TITLES };
