import { formEl, galleryEl, loadBtn } from './js/refs';
import { appendMarkupGallery } from './js/markup';
import ImagesApiService from './js/api';

import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imagesApiService = new ImagesApiService();
let shownImagesQuantity = 0;

formEl.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onLoadMore);

loadBtn.classList.add('is-hidden');

function onSearch(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  imagesApiService.query = event.target.elements.searchQuery.value.trim();
  imagesApiService.resetPage();

  if (imagesApiService.query === '') {
    Notify.warning('Please, fill the main field');
    return;
  }

  getImages();
}

async function getImages() {
  try {
    const result = await imagesApiService.fetchImages();
    const { hits, total } = result;

    if (!hits.length) {
      Report.failure(
        'Error',
        'Sorry, there are no images matching your search query. Please try again.',
        'OK'
      );
      return;
    }

    appendMarkupGallery(hits);
    getNotificationOfImgsAmount(hits, total);
  } catch (err) {
    console.log(err.message);
  }
}

function onLoadMore() {
  imagesApiService.incrementPage();
  getImages();
}

function getNotificationOfImgsAmount(hits, total) {
  shownImagesQuantity += hits.length;

  if (shownImagesQuantity < total) {
    Notify.success(`Hooray! We found ${total} images !!!`);
    loadBtn.classList.remove('is-hidden');
  }

  if (shownImagesQuantity === total) {
    loadBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
