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

export const getDate = (date) => {
  const day = date?.getDate();
  return day < 10 ? `0${day}` : day;
};

export const getMonth = (date) => {
  const month = date?.getMonth() + 1;
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return 'Invalid Month';
  }
};

export const getDay = (date) => {
  const day = date?.getDay();
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Invalid day';
  }
};

export const addSuffix = (number) => {
  switch (number) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
};

export const countCharactersInAString = (str, character) => {
  const re = new RegExp(character, 'g');
  const count = str.match(re).length;
  return count;
};

export const generateRandomId = () => {
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += Math.ceil(Math.random() * 10);
  }
  return id;
};
