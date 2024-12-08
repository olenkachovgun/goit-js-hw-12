import axios from 'axios';
// У файлі pixabay-api.js зберігай функції для HTTP-запитів.
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47377871-88caea6ffc61c5284332b3ad8';

export async function serviceImages(search, page = 1) {
  const { data } = await axios(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: search,
      page,
      per_page: 15,
    },
  });

  return data;
}
