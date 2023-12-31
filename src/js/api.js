import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.PER_PAGE = 40;
    this.shownImages = 0;
    this.total = 0;
  }

  async fetchImages() {
    const params = new URLSearchParams({
      key: '38831049-96c7643f1aee916d65391f7e0',
      q: `${this.searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${this.PER_PAGE}`,
      page: `${this.page}`,
    });

    const response = await axios.get(`${BASE_URL}?${params}`);
    const data = response.data;
    this.shownImages += data.hits.length;
    this.total = data.total;
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  resetShownImages() {
    this.shownImages = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
