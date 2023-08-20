import { formEl, galleryEl, loadBtn } from './js/refs';
import { appendMarkupGallery } from './js/markup';
import ImagesApiService from './js/api';
import { catchScroll } from './js/infinity-scroll';

import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imagesApiService = new ImagesApiService();
let isFetching = false;
catchScroll();

formEl.addEventListener('submit', onSearch);

// !=====If you want to use LoadMoreBtn instead of Infinity scroll
// loadBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  imagesApiService.query = event.target.elements.searchQuery.value.trim();
  galleryEl.innerHTML = '';
  imagesApiService.resetPage();
  imagesApiService.shownImages = 0;

  if (imagesApiService.query === '') {
    Notify.warning('Please, fill the main field');
    return;
  }
  getImages();
}

async function getImages() {
  try {
    isFetching = true;
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
    getNotificationOfImgsAmount(total);
    isFetching = false;
  } catch (err) {
    console.log(err.message);
  }
}
//!====== ONLOADMORE BTN =======
// ! uncomment below if you want to use loadMoreBtn
// function onLoadMore() {
//   imagesApiService.incrementPage();
//   getImages();
// }

function getNotificationOfImgsAmount(total) {
  if (imagesApiService.shownImages < total) {
    Notify.success(`Hooray! We found ${total} images !!!`);

    // ! === uncomment below if you want to use loadMoreBtn
    // loadBtn.classList.remove('is-hidden');
  }

  if (imagesApiService.shownImages >= total) {
    // loadBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

export { getImages, imagesApiService, isFetching };
