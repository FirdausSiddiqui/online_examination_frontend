export const debounce = (callback, timeout = 500) => {
  let id = null;
  return (...args) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
