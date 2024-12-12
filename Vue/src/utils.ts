type Arrayable<T> = T | T[];

const makeArray = <T>(src: Arrayable<T>): T[] => Array.isArray(src) ? src : [src];

const wait = (
  time: number,
  steps = 1,
  stepProcessor: (step: number) => void = () => {},
  omitError = true,
) => new Promise<void>((res, rej) => {
  let counter = 0;
  const usedSteps = steps || 1;
  let timerId: ReturnType<typeof setTimeout>;
  (function handler() {
    timerId = setTimeout(() => {
      clearTimeout(timerId);
      if (counter <= usedSteps - 1) {
        stepProcessor(counter);
      }
      counter++;
      if (counter <= usedSteps) {
        handler();
      } else {
        const result = (Math.round(Math.random()) === 1 || omitError) ? res : rej;
        result();
      }
    }, time / usedSteps);
  })();
});


export { makeArray, wait };
export type { Arrayable };
