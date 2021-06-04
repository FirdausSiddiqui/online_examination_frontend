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

export const sortByDate = (data) => {
  return data.sort((a, b) => (a.added > b.added ? -1 : 1));
};
