const makeArray = (src) => Array.isArray(src) ? src : [src];

const wait = (
  time,
  steps = 1,
  stepProcessor = () => {},
  omitError = true,
) => new Promise((res, rej) => {
  let counter = 0;
  const usedSteps = steps || 1;
  let timerId;
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