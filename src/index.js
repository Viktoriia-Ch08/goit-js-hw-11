import { formEl, searchBtn } from './js/refs';
import { fetchImages } from './js/api';
import { markupGallery } from './js/markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  const inputValue = event.target.elements.searchQuery.value;

  const result = await fetchImages(inputValue);
  if (result.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  markupGallery(result.hits);
  console.log(result.hits);
}

// function btnStatus(inputValue, status) {
//   if (inputValue === '') {
//     searchBtn.disabled = status;
//   }
//   searchBtn.disabled = !status;
// }
