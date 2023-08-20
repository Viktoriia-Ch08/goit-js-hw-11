import { galleryEl } from './refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

function appendMarkupGallery(array) {
  const galleryMarkup = array
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" width="400" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views </b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments </b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>
      ${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
}

export { appendMarkupGallery };
