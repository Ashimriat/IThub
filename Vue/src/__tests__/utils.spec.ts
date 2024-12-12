import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { makeArray, wait } from '@/utils';


describe('utils', () => {
  describe('makeArray', () => {
    const exmpl1 = '';
    const exmpl2 = ['', '', ''];
    it('Возвращает массив, если передана строка', () => {
      expect(makeArray(exmpl1)).toBeTypeOf('object');
      expect(Array.isArray(makeArray(exmpl1))).toBeTruthy();
    });

    it('Возвращает тот же самый массив, если передан массив', () => {
      const res = makeArray(exmpl2);
      expect(res).toEqual(exmpl2);
    });
  });

  describe('wait', () => {
    const mockHandler = vi.fn((step: number) => step);
    const mockResHandler = vi.fn();

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('Завершает исполнение по указанию заданного времени', async () => {
      const time = 9_000;
      wait(time, 1, () => {}, true).then(mockResHandler);
      await vi.advanceTimersByTimeAsync(time);
      expect(mockResHandler).toBeCalled();
    });

    it('Вызывает обработчик столько же раз, сколько задано шагов', async () => {
      const stepsAmount = 9;
      wait(9_000, stepsAmount, mockHandler, true);
      await vi.advanceTimersByTimeAsync(9_000);
      expect(mockHandler).toBeCalledTimes(stepsAmount);
    });

    it.skip('Вызывает обработчик через равные промежутки времени', () => {
      const time = 9_000;
      const stepsAmount = 9;
      wait(9_000, stepsAmount, mockHandler, true);
      for (let i = 1; i < stepsAmount; i++) {
        vi.advanceTimersByTime.call(vi, (time / stepsAmount) - 100);
        expect(mockHandler).not.toBeCalled();
        vi.advanceTimersByTime.call(vi, 100);
        expect(mockHandler).toBeCalledTimes(i);
      }
    });
  })
});
