// type ThrottleFunction = (...args: any[]) => void;

function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastExecutedTime = 0;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const currentTime = Date.now();

    if (currentTime - lastExecutedTime < delay) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        lastExecutedTime = currentTime;
        func.apply(this, args);
      }, delay);
    } else {
      lastExecutedTime = currentTime;
      func.apply(this, args);
    }
  };
}

export default throttle;