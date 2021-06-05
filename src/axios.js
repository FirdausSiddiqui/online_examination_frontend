import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://exmaination.herokuapp.com/'
});

export default instance;
