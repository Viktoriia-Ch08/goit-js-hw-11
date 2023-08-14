import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(value, page = 1) {
  const params = new URLSearchParams({
    key: '38831049-96c7643f1aee916d65391f7e0',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}

export { fetchImages };
