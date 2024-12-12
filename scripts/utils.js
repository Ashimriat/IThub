const makeArray = (src) => Array.isArray(src) ? src : [src];

const wait = (
  time,
  steps = 1,
  stepProcessor = () => {},
  omitError = true,
) => new Promise((res, rej) => {
  let counter = 0;
  let usedTime = time ?? (Math.random() || 1) * 1000;
  let usedSteps = steps || 1;
  let timerId;
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
  })()
});