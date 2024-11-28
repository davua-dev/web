// api.js

import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

export const getAllPlants = () => axios.get(`${baseURL}/plant`);

// Додатковий експорт для axios
export default axios;
